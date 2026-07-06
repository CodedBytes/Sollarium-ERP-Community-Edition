import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import csrfProtection from '@fastify/csrf-protection';
import dotenv from 'dotenv';
import zlib from 'zlib'
import OAuth from './src/core/http/routes/OAuth.js';
import bcrypt from 'bcrypt';
import { initRedis, getCache, setCache, delCache } from './src/config/redisClient.js';
import { getTenantConnection, withTemporaryConnection } from './src/config/knex_DB.js';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from './src/core/utils/apiError.js';
import database_decorator from './src/core/http/decorators/databaseTenant.js';
import jwt_decorator from './src/core/http/decorators/JWT_Auth.js';
dotenv.config();

/// Conexões de Database
const HQ_DB = {
  db_host: process.env.HQ_HOST,
  db_port: process.env.HQ_PORT,
  db_user: process.env.HQ_USER,
  db_password: process.env.HQ_PASSWORD,
  db_name: process.env.HQ_DB_NAME,
}

// Conifgurações do Fastify
const fastify = Fastify({ logger: true, trustProxy: true });
const IS_PROD = false;

// Segurança Básica e Compressão
fastify.register(helmet, {
  contentSecurityPolicy: IS_PROD ? {
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"]
    }
  } : false,
  hsts: IS_PROD
});

// Compressão de Resposta
fastify.register(compress, {
  global: true,
  threshold: 1024,
  brotliOptions: { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: IS_PROD ? 4 : 1 } },
  zlibOptions: { level: IS_PROD ? 6 : 1 }
});

// CORS
fastify.register(cors, { 
  origin: (origin, cb) => { cb(null, true) },
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'] 
});

// Proteção contra Força Bruta utilizando Rate Limiting
fastify.register(rateLimit, { max: 50, timeWindow: '1 minute' });

// Configuração de Cookies, JWT e CSRF
fastify.register(cookie, { secret: process.env.COOKIE_SECRET });
fastify.register(jwt, { 
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: 'auth_token', 
      signed: false 
    }
  }
);
fastify.register(csrfProtection, { cookieOpts: { signed: true } });

// Decorators para Conexão com Banco de Dados e Autenticação JWT
fastify.register(database_decorator, { HQ_DB, getTenantConnection });
fastify.register(jwt_decorator);

// --- ROTAS ----------------------------------------------------------------------------------------
fastify.get('/api/OAuth/csrf', OAuth.GenerateCSRF(IS_PROD));
fastify.post('/api/OAuth/login', {config: {rateLimit: { max: 4, timeWindow: '1 minute' }}}, OAuth.DoLogin(withTemporaryConnection, getTenantConnection, IS_PROD, fastify, bcrypt, getCache, setCache, delCache, uuidv4, ApiError, HQ_DB));
fastify.get('/api/OAuth/me', { preHandler: async(req, rep) => { await req.authenticate(req, rep); } }, async (req, rep) => { return { user: req.user }; });
fastify.post('/api/OAuth/logout', { preHandler: async(req, rep) => { await req.authenticate(req, rep); await req.tenantDb(req, rep); } }, OAuth.DoLogout(getCache, delCache, IS_PROD, ApiError));

// Exemplo de rota privada da aplicação
// fastify.post('/api/contracts', { onRequest: fastify.csrfProtection, preHandler: [fastify.authenticate, fastify.tenantDb] }, async (request, reply) => {
//     return { data: 'Dados sensíveis confidenciais' };
// });

// Iniciando servidor
const start = async () => {
  try {
    // Aguarda o Fastify estar pronto antes de iniciar a conexão com o Redis
    await fastify.ready();

    // Inicia conexão com Redis ANTES do servidor abrir portas
    await initRedis(); 

    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Servidor rodando na porta 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();