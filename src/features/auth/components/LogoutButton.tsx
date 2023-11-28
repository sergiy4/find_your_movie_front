import { useEffect } from 'react';
import { useSendLogoutMutation } from '../authApi/authApi';
import { useNavigate } from 'react-router-dom';

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
    }
  }, [isSuccess]);

  return (
    <>
      <button
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
