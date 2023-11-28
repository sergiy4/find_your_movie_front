import { InputErrorProps } from '../types';
import { ErrorMessage } from '@hookform/error-message';

const InputErrorMessage = ({ errors, name }: InputErrorProps) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <p>{message}</p>}
    />
  );
};

export default InputErrorMessage;
