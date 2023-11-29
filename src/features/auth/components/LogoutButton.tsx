import { useEffect } from 'react';
import { useSendLogoutMutation } from '../authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { setLoginState } from '../utils/loginState';
const LogoutButton = () => {
  const navigate = useNavigate();
  const [logout, { isError, error, isSuccess }] = useSendLogoutMutation();

  if (isError) {
    console.log(error);
  } else if (isSuccess) {
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      setLoginState(false);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        className="btn header_login_btn"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
};
export default LogoutButton;
