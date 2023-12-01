import { toast } from 'react-toastify';

const useToastMessages = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  return [notifySuccess, notifyError];
};

export default useToastMessages;
