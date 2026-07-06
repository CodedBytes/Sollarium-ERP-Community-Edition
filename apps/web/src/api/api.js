import axios from 'axios';

// Cria uma instância do Axios com a URL base da API e configurações padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 25000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true 
});

// Busca o token CSRF do cookie para proteger contra ataques CSRF
const getCSRFToken = () => {
  const match = document.cookie.match(new RegExp('(^| )csrfToken=([^;]+)'));
  return match ? match[2] : null;
};

// Intercepta as requisições para adicionar o token CSRF nos cabeçalhos das mutações
api.interceptors.request.use((config) => {
    // Adiciona o token anti-CSRF exigido pelo Fastify para mutações
    const csrfToken = getCSRFToken();
    if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
      config.headers['x-csrf-token'] = csrfToken;
    }

    // Aqui da pra por mais configurações pra cada requisição

    // Retorna a configuração da requisição
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta as respostas para lidar com erros de autenticação e tentativas de reconexão
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Se a resposta for 401 (não autorizado), redireciona para a página de login, exceto se a requisição for para '/api/OAuth/me'
    if (error.response?.status === 401) {
      if (error.config.url.includes('/api/OAuth/me')) return Promise.reject(error);
      if (window.location.pathname !== '/login') window.location.href = '/login';
      return Promise.reject(error);
    }

    // Implementa uma lógica de retry para erros de rede ou timeout, limitando a uma tentativa
    if (!config || config.__retryCount >= 1) return Promise.reject(error);

    // Define condições para tentar novamente a requisição em caso de erro de rede ou timeout
    const shouldRetry = !error.response || error.code === 'ECONNABORTED' || error.message?.includes('Network Error');
    if (shouldRetry) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      await new Promise((resolve) => setTimeout(resolve, 500));
      return api(config);
    }

    // Para outros erros, rejeita a promessa com o erro
    return Promise.reject(error);
  }
);

export default api;