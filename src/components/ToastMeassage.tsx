import { useEffect } from 'react';
import { toast } from 'react-toastify';

type ToastMessage = {
  type: 'success' | 'error';
  message: string;
};
const ToastMessage = ({ type, message }: ToastMessage) => {
  useEffect(() => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      // Додайте інші типи повідомлень за необхідності
      default:
        break;
    }
  }, [type, message]);

  return null;
};

export default ToastMessage;
