import { PersonAuthType, personAuthSchema } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpMutation } from '../authApi/authApi';
import FormInput from '../../../components/FormInput';

const SignUpForm = () => {
  const methods = useForm<PersonAuthType>({
    resolver: zodResolver(personAuthSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [signUp, { isSuccess, data, isError, error }] = useSignUpMutation();

  if (isError) {
    console.log(error);
  } else if (isSuccess) {
    // TODO: redirect on login page
    console.log(data);
  }
  const onSubmit = handleSubmit(async (data) => {
    await signUp(data);
  });

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
          <button className="btn login_btn" onClick={onSubmit}>
            SignUp
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default SignUpForm;
