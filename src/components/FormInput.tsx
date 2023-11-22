import { useFormContext } from 'react-hook-form';
import InputErrorMessage from './InputErrorMessages';
import { InputProps } from '../types';

const FormInput = ({
  label,
  type,
  placeholder,
  id,
  name,
  errors,
  defaultValue,
}: InputProps) => {
  const form = useFormContext();
  const { register } = form;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
      />
      <div>
        <InputErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormInput;
