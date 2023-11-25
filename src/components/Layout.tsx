import { Outlet, useLocation } from 'react-router-dom';
import PersistLogin from '../features/auth/components/PersistLogin';
import LogoutButton from '../features/auth/components/LogoutButton';
import Header from './Header';
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="header_wrapped_fix" key={1}>
        <Header></Header>
      </div>
      {/* <LogoutButton /> */}
      {pathname === '/login' || pathname === '/signup' || pathname === '/' ? (
        <Outlet />
      ) : (
        <PersistLogin />
      )}
    </>
  );
};

export default Layout;
