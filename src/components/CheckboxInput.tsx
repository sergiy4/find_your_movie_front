import { InputProps } from '../types';
import { useFormContext } from 'react-hook-form';
import InputErrorMessage from './InputErrorMessages';

export const CheckboxInput = ({ label, name, errors }: InputProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <div>
        <label htmlFor={name} className="form__label">
          {label}
        </label>
        <input type="checkbox" {...register(name)} />
        <InputErrorMessage name={name} errors={errors} />
      </div>
    </div>
  );
};

export default CheckboxInput;
