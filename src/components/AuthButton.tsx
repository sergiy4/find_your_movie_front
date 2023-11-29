import LogoutButton from '../features/auth/components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { getLoginState } from '../features/auth/utils/loginState';
const AuthButton = () => {
  let content;
  const loginState = getLoginState();
  const navigate = useNavigate();

  if (location.pathname === '/login') {
    content = null;
  } else {
    if (loginState) {
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
