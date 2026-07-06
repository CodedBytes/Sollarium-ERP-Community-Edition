import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export function PageLoader() {
  const location = useLocation();

  useEffect(() => {
    // Inicia a barra quando a rota mudar
    NProgress.start();
  }, [location.pathname]);

  return null; // Este componente não renderiza nada na tela
}