import { useSelector } from 'react-redux';
import { SelectToken } from '../authApi/authSlice';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  UserInfo: {
    userID: string;
  };
}

const useAuth = () => {
  const token = useSelector(SelectToken);

  if (token) {
    const decode = jwtDecode<JwtPayload>(token);

    const { userID } = decode.UserInfo;
    return { userID };
  }

  return { userID: '' };
};

export default useAuth;
