import { useSendLogoutMutation } from '../authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { setLoginState } from '../utils/loginState';
import useToastMessages from '../../../hooks/useToastMessage';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';

const LogoutButton = () => {
  const [notifySuccess, notifyError] = useToastMessages();
  const navigate = useNavigate();
  const [logout, { error }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setLoginState(false);
      navigate('/');
    } catch (err) {
      console.log(error);
      let errorMessage = getQueryErrorMessage(error);
      notifyError(errorMessage);
    }
  };

  return (
    <button className="btn header_login_btn" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default LogoutButton;
