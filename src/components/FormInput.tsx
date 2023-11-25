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
    <div className="form_input_box">
      <label htmlFor={id} className="form_label">
        {label}
      </label>
      <input
        className="form_input"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
      />
      <div className="error_section">
        <InputErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormInput;
