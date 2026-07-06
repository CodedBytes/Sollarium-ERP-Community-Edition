import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Carrega os JSONs da pasta public
  .use(LanguageDetector) // Descobre o idioma do usuário
  .use(initReactI18next) // Passa a instância para o React
  .init({
    fallbackLng: 'pt-BR', // Idioma de segurança se faltar alguma chave
    ns: ['common'], // Namespace padrão que sempre carrega
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React já protege contra XSS nativamente
    },
    
    backend: {
      // Onde os arquivos JSON vão ficar
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }
  });

export default i18n;