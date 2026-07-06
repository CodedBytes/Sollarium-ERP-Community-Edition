/**
 * Modulo desenvolvido por joao victor segantini para desenvolvimento de um motor de erp originalmente chamado de Sollarium ERP Engine.
 * Sollarium ERP Engine foi um conceito de engine de erp desenvolvido por mim, combinando conteúdos sistemas de erp com sistemas de ativade em tempo real com possivel
 * integração com inteligencia artificial.
 * 
 * Sollarium ERP é um ERP de codigo atualmente fechado e de unico e exclusivo uso pessoal.
 * 
 * Copyright: LGPL3 - João Victor Segantini - CodedBytes
 * 
 * Decorator para autenticação JWT
 */
import fp from 'fastify-plugin';

const JWT_Auth = async (fastify) => {
    fastify.decorateRequest('authenticate', async (req, rep) => {
        try {
            const token = req.cookies['auth_token'];
            if (!token) throw new Error('No token');

            // Verifica o token JWT apenas no cookie, sem considerar o cabeçalho Authorization
            await req.jwtVerify({ onlyCookie: true }); 
        } 
        catch (err) {
            fastify.log.error("Erro no JWT:", err.message);
            rep.status(401).send({ error: 'Sessão inválida ou expirada.' });
        }
    });
};

export default fp(JWT_Auth);