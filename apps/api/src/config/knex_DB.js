/**
 * Modulo desenvolvido por joao victor segantini para desenvolvimento de um motor de erp originalmente chamado de Sollarium ERP Engine.
 * Sollarium ERP Engine foi um conceito de engine de erp desenvolvido por mim, combinando conteúdos sistemas de erp com sistemas de ativade em tempo real com possivel
 * integração com inteligencia artificial.
 * 
 * Sollarium ERP é um ERP de codigo atualmente fechado e de unico e exclusivo uso pessoal.
 * 
 * Copyright: LGPL3 - João Victor Segantini - CodedBytes
 * 
 * Modulo para configuração de banco de dados PostgreSQL, temporário e persistente através de Pools de conexão.
 */
import Knex from 'knex';

// Guarda as instâncias: Map<tenantId, { knex: KnexInstance, lastAccessed: number }>
const tenantPools = new Map(); 

// Configurações de Pool
const POOL_MIN = 0; // IMPRESCINDÍVEL SER 0. Se ficar ocioso, fecha a conexão no PG.
const POOL_MAX = parseInt(process.env.DB_POOL_MAX, 10) || 10;
const IDLE_TIMEOUT = 10000; // Tempo que a conexão fica ociosa no PG antes de fechar
const INSTANCE_TTL = 1000 * 60 * 30; // 30 minutos sem NENHUMA requisição = destrói a pool do mapa

/**
 * Retorna uma instância Knex para o tenant, criando uma se não existir.
 */
export const getTenantConnection = (tenantId, dbConfig) => {
    const now = Date.now();

    // Se já existe a pool na memória do Node, atualiza o tempo de acesso e a retorna.
    if (tenantPools.has(tenantId)) {
        const poolData = tenantPools.get(tenantId);
        poolData.lastAccessed = now;
        return poolData.knex;
    }

    // Se não existe, cria uma nova instância Knex
    const knexInstance = Knex({
        client: 'pg',
        connection: {
            host: dbConfig.db_host,
            port: dbConfig.db_port,
            user: dbConfig.db_user,
            password: dbConfig.db_password,
            database: dbConfig.db_name,
        },
        pool: {
            min: POOL_MIN,
            max: POOL_MAX,
            idleTimeoutMillis: IDLE_TIMEOUT,
        }
    });

    // Salva no mapa
    tenantPools.set(tenantId, {
        knex: knexInstance,
        lastAccessed: now
    });

    console.log(`[DB] Nova pool criada para o Tenant: ${tenantId}`);
    return knexInstance;
};

/**
 * [USO ADMIN / CRON JOBS / MIGRAÇÕES]
 * Cria uma conexão temporária, executa uma função asíncrona e DESTRÓI a conexão logo após.
 * Não salva no cache. Ideal para o painel Admin da Sollarium.
 * 
 * @param {Object} dbConfig - As credenciais do banco a ser acessado
 * @param {Function} callback - A função que contém suas lógicas de banco
 */
export const withTemporaryConnection = async (dbConfig, callback) => {
    // Para tarefas temporárias, limitamos o pool ao máximo de 1 ou 2 conexões
    const tempKnex = Knex({
        client: 'pg',
        connection: {
            host: dbConfig.db_host,
            port: dbConfig.db_port,
            user: dbConfig.db_user,
            password: dbConfig.db_password,
            database: dbConfig.db_name,
        },
        pool: { min: 0, max: 2, idleTimeoutMillis: 1000 } 
    });

    try {
        console.log(`[DB] Conexão temporária aberta para: ${dbConfig.db_name}`);
        // Aguarda a execução da lógica que o dev passou
        return await callback(tempKnex);
    } 
    catch (error) {
        console.error(`[DB] Erro durante execução temporária em ${dbConfig.db_name}:`, error.message);
        throw error; // Repassa o erro para o controller tratar (ex: retornar status 500)
    } 
    finally {
        // O finally garante que o banco SERÁ fechado, mesmo se der sucesso ou erro!
        try {
            await tempKnex.destroy();
            console.log(`[DB] Conexão temporária destruída com sucesso (${dbConfig.db_name})`);
        } catch (destroyError) {
            console.error('[DB] Falha ao destruir conexão temporária:', destroyError);
        }
    }
};

/**
 * Garbage Collector: Roda de tempos em tempos para destruir Pools Knex
 * de clientes que não acessam o sistema há muito tempo.
 * Evita vazamento de memória (Memory Leak) no Node.js.
 */
setInterval(() => {
    const now = Date.now();
    for (const [tenantId, poolData] of tenantPools.entries()) {
        if (now - poolData.lastAccessed > INSTANCE_TTL) {
            console.log(`[DB] Destruindo pool ociosa do Tenant: ${tenantId}`);
            poolData.knex.destroy().catch(err => console.error(err));
            tenantPools.delete(tenantId);
        }
    }
}, 1000 * 60 * 5); // Verifica a cada 5 minutos