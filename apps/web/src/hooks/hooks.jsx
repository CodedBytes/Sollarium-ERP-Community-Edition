import { useContext } from 'react';
import { AuthContext } from '../context/authProvider';

export const useAuth = () => {
  const { login, loading, user, logout, dataReturned } = useContext(AuthContext);

  return { login, loading, user, logout, dataReturned };
}