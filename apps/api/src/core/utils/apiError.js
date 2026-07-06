/**
 * Classe para controle de erros da API, para serem enviados para o front-end posteriormente.
 */
export class ApiError extends Error {
    /**
     * Classe para controle de erros da API, para serem enviados para o front-end posteriormente.
     * O constructor recebe a mensagem a ser traduzida pelo front-end, ex: error_auth_user, e o codigo http do erro ou aviso.
     * @param {String} message - Mensagem a ser traduzida
     * @param {HTTP_Status} statusCode - Codigo de status HTTP
     */
    constructor(message, statusCode = 400) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.isApiError = true;
    }
}