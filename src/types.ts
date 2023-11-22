import { FieldErrors } from 'react-hook-form';

export interface InputErrorProps {
  name: string;
  errors: FieldErrors;
}

export interface InputProps extends InputErrorProps {
  label: string;
  id?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  defaultValue?: string | boolean;
}
