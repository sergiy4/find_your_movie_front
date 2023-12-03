import { PersonAuthType, personAuthSchema } from '../schemas';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpMutation } from '../authApi/authApi';
import FormInput from '../../../components/FormInput';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  let errorMessage;
  const methods = useForm<PersonAuthType>({
    resolver: zodResolver(personAuthSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [signUp, { error, isError }] = useSignUpMutation();
  if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  }
  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data).unwrap();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <div className="box_form_signup">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form_inputs_signup">
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
              <section>
                {errorMessage ? (
                  <p className="form_message error">{errorMessage}</p>
                ) : null}
              </section>
            </div>
          </form>
        </FormProvider>
        <footer className="footer_register">
          <div className="footer_content">
            <hr />
            <div>
              <p>ALREADY HAVE AN ACCOUNT?</p>
              <button
                className="btn signup_btn"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log in
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SignUpForm;
