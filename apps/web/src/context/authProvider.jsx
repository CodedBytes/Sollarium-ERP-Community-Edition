import { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dataReturned, setDataReturned] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pega o CSRF inicial e recuperar a sessão
    api.get('/api/OAuth/csrf').then(() => {
      api.get('/api/OAuth/me')
        .then((response) => { 
          setUser(response.data.user);
          setDataReturned(response.data); 
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    });
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/api/OAuth/login', credentials);
    setUser(data.user);
    setDataReturned(data);
    return data;
  };

  const logout = async () => {
    await api.post('/api/OAuth/logout');
    setUser(null);
    setDataReturned(null);
  };

  if (loading) return <div>Carregando aplicação...</div>;
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, dataReturned }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext }
export default AuthProvider;