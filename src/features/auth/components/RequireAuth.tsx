import useAuth from '../hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  console.log('RequireAuth');
  const location = useLocation();
  const { userID } = useAuth();
  console.log(userID);
  return (
    <>
      {userID ? (
        children
      ) : (
        <>
          {console.log('here')}
          {/* {console.log(<Navigate to="/login" />)} */}
          <Navigate to="/login" state={{ from: location }} replace />
        </>
      )}
    </>
  );
};

export default RequireAuth;
