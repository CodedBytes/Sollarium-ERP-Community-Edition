import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/hooks';

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando Sollarium...</div>;
  }

  // Se o backend não autenticou a sessão, joga de volta pro login
  return !user ? <Outlet /> : <Navigate to="/home" replace />;
};