/**
 * Modulo desenvolvido por joao victor segantini para desenvolvimento de um motor de erp originalmente chamado de Sollarium ERP Engine.
 * Sollarium ERP Engine foi um conceito de engine de erp desenvolvido por mim, combinando conteúdos sistemas de erp com sistemas de ativade em tempo real com possivel
 * integração com inteligencia artificial.
 * 
 * Sollarium ERP é um ERP de codigo atualmente fechado e de unico e exclusivo uso pessoal.
 * 
 * Copyright: LGPL3 - João Victor Segantini - CodedBytes
 * 
 * Modulo para configuração de banco de dados temporário redis.
 */
import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://172.29.57.253:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) return new Error('Max reconnect attempts exhausted');
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log('Conectado ao Redis.'));

export const initRedis = async () => {
    if (!redisClient.isOpen) await redisClient.connect();
};

export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`Erro GET Redis (${key}):`, err);
        return null;
    }
};

export const setCache = async (key, value, ttlSeconds = 3600) => {
    try {
        await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
    } catch (err) {
        console.error(`Erro SET Redis (${key}):`, err);
    }
};

export const delCache = async (key) => {
    try { 
        const value = await redisClient.del(key); return value; } 
    catch (err) { 
        console.error(`Não foi possível deletar a chave "${key}":`, err); 
    }
}

export default redisClient;