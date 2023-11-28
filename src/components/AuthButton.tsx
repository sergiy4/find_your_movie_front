import LogoutButton from '../features/auth/components/LogoutButton';
import useAuth from '../features/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const AuthButton = () => {
  let content;
  const { userID } = useAuth();
  const navigate = useNavigate();

  if (location.href === '/login') {
    content = null;
  } else {
    if (userID) {
      content = <LogoutButton />;
    } else {
      content = (
        <button
          className="btn header_login_btn"
          title="Logout"
          onClick={() => navigate('/login')}
        >
          LOG IN
        </button>
      );
    }
  }

  return <>{content}</>;
};

export default AuthButton;
