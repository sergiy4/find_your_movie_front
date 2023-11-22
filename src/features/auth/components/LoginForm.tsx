import { personAuthSchema, PersonAuthType } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '../authApi/authApi';
import { setCredentials } from '../authApi/authSlice';
import { useDispatch } from 'react-redux';
import usePersist from '../hooks/usePersist';
import FormInput from '../../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';

const LoginForm = () => {
  let errorMessage;
  const [persist, togglePersist] = usePersist();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<PersonAuthType>({
    resolver: zodResolver(personAuthSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [login, { isError, error, isSuccess }] = useLoginMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const credentials = await login(data);
      if ('data' in credentials) {
        dispatch(setCredentials(credentials.data));
      }

      // TODO: clear form
      // TODO: redirect to main page
      navigate('/');
      // methods.reset();
    } catch (err) {
      console.log(err);
    }
  });

  if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    // TODO: redirect on login page
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Username"
            placeholder="Username"
            id={'username'}
            type="text"
            name="username"
            errors={errors}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            id={'password'}
            type="password"
            name="password"
            errors={errors}
          />
          <button onClick={onSubmit}>Login</button>
          <label htmlFor="persist">Trust this device?</label>
          <input
            id="persist"
            type="checkbox"
            onChange={togglePersist}
            checked={persist}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
