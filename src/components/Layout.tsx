import { Outlet, useLocation } from 'react-router-dom';
import PersistLogin from '../features/auth/components/PersistLogin';
import LogoutButton from '../features/auth/components/LogoutButton';
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <LogoutButton />
      {pathname === '/login' || pathname === '/signup' || pathname === '/' ? (
        <Outlet />
      ) : (
        <PersistLogin />
      )}
    </>
  );
};

export default Layout;
