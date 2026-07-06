/**
 * Modulo desenvolvido por joao victor segantini para desenvolvimento de um motor de erp originalmente chamado de Sollarium ERP Engine.
 * Sollarium ERP Engine foi um conceito de engine de erp desenvolvido por mim, combinando conteúdos sistemas de erp com sistemas de ativade em tempo real com possivel
 * integração com inteligencia artificial.
 * 
 * Sollarium ERP é um ERP de codigo atualmente fechado e de unico e exclusivo uso pessoal.
 * 
 * Copyright: LGPL3 - João Victor Segantini - CodedBytes
 * 
 * Decorator para conexão com o banco de dados do sistema.
 */
import fp from 'fastify-plugin';

const databaseTenant = async (fastify, opts) => {
    fastify.decorateRequest('tenantDb', async (req, rep) => {
        try {
            // Obtém ou cria a pool gerenciada do Knex e injeta no request
            req.dbPool = opts.getTenantConnection("community", opts.HQ_DB);
        } 
        catch (error) {
            req.log.error("Erro no TenantDb Decorator: " + error.message);
            return rep.status(500).send({ error: 'Falha ao conectar ao banco de dados do sistema.' });
        }
    });
};

export default fp(databaseTenant);