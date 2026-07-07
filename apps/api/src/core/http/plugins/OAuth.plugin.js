/**
 * Modulo desenvolvido por joao victor segantini para desenvolvimento de um motor de erp originalmente chamado de Sollarium ERP Engine.
 * Sollarium ERP Engine foi um conceito de engine de erp desenvolvido por mim, combinando conteúdos sistemas de erp com sistemas de ativade em tempo real com possivel
 * integração com inteligencia artificial.
 * 
 * Sollarium ERP é um ERP de codigo atualmente fechado e de unico e exclusivo uso pessoal.
 * 
 * Copyright: LGPL3 - João Victor Segantini - CodedBytes
 * 
 * Plugin para rotas de Autenticação 2.1
 */
const AuthRoutes = async (fastify, options) => {
    const { IS_PROD, bcrypt, getCache, setCache, delCache, 
        uuidv4, ApiError, HQ_DB, getTenantConnection, rateLimit } = options;

    /**
     * Responsável por criar o token CSRF
     */
    fastify.get('/api/OAuth/csrf', async (req, rep) => {
        const token = await rep.generateCsrf();
        rep.setCookie('csrfToken', token, {path: '/', secure: IS_PROD, sameSite: IS_PROD ? 'strict' : 'lax', httpOnly: false });
        return rep.code(200).send({ message: 'CSRF Setado corretamente.' });
    });

    /**
     * Responsável por autenticar o usuário.
     */
    fastify.post('/api/OAuth/login', {config: {rateLimit: { max: 4, timeWindow: '1 minute' }}}, async (req, rep) => {
        const { email, senha } = req.body;

        try {
            const conn = await getTenantConnection('community', HQ_DB);
            const login = await conn.raw(`
                SELECT 
                    u."id", u."email", u."user_id", u."password",
                    u."permission_id", u."secret", ui."full_name", ui."profile_photo_path"
                FROM users u
                LEFT JOIN user_informations ui 
                    ON u."user_id" = ui."user_id"
                WHERE u."email" = ? LIMIT 1;
            `, [email]);

            // Caso tenha um login inválido, lança um erro de autenticação
            if (!login || login.rows.length === 0) throw new ApiError('E-mail ou senha inválidos', 401); 
            const userData = login.rows[0];

            // Verifica se a senha fornecida é válida
            const isPasswordValid = await bcrypt.compare(senha, userData.password);
            if (!isPasswordValid) throw new ApiError('E-mail ou senha inválidos', 401);

            // Gera o token JWT e cria uma nova sessão
            const token = fastify.jwt.sign({ sub: userData.id, email: email, tenant: 'community' });
            const session = uuidv4();
            
            // Verifica se o usuário já possui uma sessão ativa
            const selectSession = await conn.raw(`SELECT "session_id" FROM sessions WHERE "user_id" = ?;`, [userData.user_id]);
            let wasLogedIn = selectSession.rows.length > 0;

            // Inicia uma transação para garantir que todas as operações sejam atômicas
            await conn.transaction(async trx => {
                // Invalida sessões anteriores
                if (wasLogedIn) {
                    const sessionIds = selectSession.rows.map(row => row.session_id);
                    await trx.raw(`UPDATE sessions SET active = FALSE WHERE user_id = ?;`, [userData.user_id]);

                    // Deleta os caches relacionados às sessões anteriores
                    const cacheDeletions = sessionIds.flatMap(sId => [
                        delCache(`session:${sId}`),
                        delCache(`session:${sId}:oauth`),
                        delCache(`session:${sId}:full_name`),
                        delCache(`session:${sId}:ip`),
                        delCache(`session:${sId}:user_id`),
                        delCache(`session:${sId}:permission_id`),
                    ]);
                    await Promise.all(cacheDeletions);
                }

                // Cria uma nova sessão no banco de dados
                const expirationTime = new Date(Date.now() + 86400 * 1000);
                await trx.raw(`
                    INSERT INTO sessions ("session_id", "user_id", "ipv4", "expiration_time", "active") 
                    VALUES (?, ?, ?, ?, TRUE);
                `, [session, userData.user_id, req.ip, expirationTime]);

                // Atualiza o status do usuário para online e registra o último login
                await trx.raw(`UPDATE users SET "online" = 1, "ipv4" = ?, "last_login" = now() WHERE "email" = ?;`, [req.ip, userData.email]);

                // Gravando no redis
                await Promise.all([
                    setCache(`session:${session}`, JSON.stringify({ email: userData.email, ip: req.ip, loginTime: new Date() }), 86400),
                    setCache(`session:${session}:oauth`, JSON.stringify({ token: token, session }), 86400),
                    setCache(`session:${session}:full_name`, userData.full_name, 86400),
                    setCache(`session:${session}:ip`, req.ip, 86400),
                    setCache(`session:${session}:user_id`, userData.user_id, 86400),
                    setCache(`session:${session}:permission_id`, userData.permission_id, 86400),
                    setCache(`session:${session}:distributor`, 'community', 86400)
                ]);
            });

            // Configura os cookies de autenticação
            const cookieOptions = { path: '/', domain: '.sollarium.com', httpOnly: true, secure: IS_PROD, sameSite: 'lax', maxAge: 86400, signed: false };
            rep.setCookie('auth_token', token, cookieOptions);
            rep.setCookie('s_ID', session, cookieOptions);

            // Retorna a resposta de sucesso com as informações do usuário
            return rep.code(200).send({message: 'Login realizado com sucesso.',  user: { email: email, wasLogedIn, full_name: userData.full_name }});
        }
        catch (error) {
            req.log.error({ err: error, event: 'login_failed', email });
            if (error instanceof ApiError) return rep.code(error.statusCode || 400).send({ msg: error.message });
            return rep.code(500).send({ error: 'Um erro técnico aconteceu ao processar o login.' });
        }
    });

    /**
     * 
     */
    fastify.get('/api/OAuth/me', { preHandler: async(req, rep) => { await req.authenticate(req, rep); } }, async (req, rep) => { return { user: req.user }; });

    /**
     * Responsável por fazer o logout do usuário.
     */
    fastify.post('/api/OAuth/logout', { preHandler: async(req, rep) => { await req.authenticate(req, rep); await req.tenantDb(req, rep); } }, async (req, rep) => {
        const session = req.cookies["s_ID"];
        const client = req.dbPool;
        const user_id = await getCache(`session:${session}:user_id`);

        // Verifica se a sessão e o user_id são válidos
        if (!session || !user_id) throw new ApiError('Sessão inválida', 401);

        try {
            await client.transaction(async trx => {
                await Promise.all([
                    trx.raw(`UPDATE users SET "online" = 0 WHERE "user_id" = ?;`, [user_id]),
                    trx.raw(`UPDATE sessions SET "active" = FALSE WHERE "session_id" = ?;`, [session])
                ]);
            });

            // Deleta os caches relacionados à sessão
            await Promise.all([
                delCache(`session:${session}:oauth`),
                delCache(`session:${session}`),
                delCache(`session:${session}:full_name`),
                delCache(`session:${session}:id`),
                delCache(`session:${session}:user_id`),
                delCache(`session:${session}:permission_id`),
                delCache(`session:${session}:distributor`)
            ]);

            // Configura os cookies de autenticação para expirar
            const cookieOptions = { path: '/', domain: '.sollarium.com', httpOnly: true, secure: IS_PROD, sameSite: 'lax', maxAge: 86400, signed: false };
            rep.clearCookie('auth_token', cookieOptions);
            rep.clearCookie('s_ID', cookieOptions);
            return rep.code(200).send({ message: 'Logout realizado com sucesso.' });
        } 
        catch (error) {
            req.log.error({ err: error, event: 'logout_failed' });
            if (error instanceof ApiError) return rep.code(error.statusCode || 400).send({ msg: error.message });
            return rep.code(500).send({ error: 'Um erro técnico aconteceu ao realizar o logout.' });
        }
    });
};

module.exports = AuthRoutes;