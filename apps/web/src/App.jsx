import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home';
import AuthProvider from './context/authProvider';
import { ProtectedRoute } from './components/protectedRoute';
import { PublicRoute } from './components/publicRoute';
import { Suspense } from 'react';
import { PageLoader } from './components/progressBar';
import Settings from './pages/settings/settings';
import InstalledModules from './pages/installed_modules/installedModules';
import UsersManagement from './pages/users_management/usersManagement';
import { addLocale, PrimeReactProvider } from 'primereact/api';
import PermissionsManagement from './pages/permission_management/permissionManagement';

function App() {
  addLocale('pt', {
    accept: 'Aceitar',
    reject: 'Rejeitar',
    upload: 'Enviar',
    cancel: 'Cancelar',
    choose: 'Escolher',
    invalidFileSize: 'O arquivo é muito grande. Tamanho máximo permitido: {0}.',
    invalidFileType: 'Tipo de arquivo inválido.',
    invalidFileLimit: 'Quantidade máxima de arquivos excedida.',
    startsWith: 'Começa com',
    contains: 'Contém',
    notContains: 'Não Contém',
    endsWith: 'Termina com',
    equals: 'Igual',
    notEquals: 'Diferente',
    matchAll: 'Corresponder tudo',
    matchAny: 'Corresponder qualquer',
    addRule: 'Regra',
    removeRule: 'Remover regra',
    clear: 'Limpar',
    apply: 'Aplicar',
    dateIs: 'Data',
    dateIsNot: 'Exceto na data',
    dateBefore: 'Antes da data',
    dateAfter: 'Depois da data',
    today: 'Hoje',
    yesterday: 'Ontem',
    clearFilter: 'Limpar filtro',
  });

  return (
    <AuthProvider>
      <BrowserRouter>
        <PrimeReactProvider value={{ locale: 'pt' }}>
        <Suspense fallback={<div>Carregando interface...</div>}>
          <PageLoader />
          <Routes>
            {/* Rota public protegida por login ativo */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Rotas Protegidas por Avaliação do Backend */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/modules" element={<InstalledModules />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/manage-users" element={<UsersManagement />} />
              <Route path="/manage-permissions" element={<PermissionsManagement />} />
            </Route>

            {/* Fallback de Redirecionamento */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
        </PrimeReactProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;