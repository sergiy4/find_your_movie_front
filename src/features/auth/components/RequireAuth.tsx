import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { userID } = useAuth();

  return (
    <>
      {userID ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
