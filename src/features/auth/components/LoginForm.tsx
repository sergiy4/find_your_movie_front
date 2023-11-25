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

      // methods.reset();
    } catch (err) {
      console.log(err);
    }
  });

  if (isError) {
    console.log(error);
    errorMessage = getQueryErrorMessage(error);
  } else if (isSuccess) {
    navigate('/');
  }

  return (
    <>
      <div className="box_form">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form_inputs">
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

              <div className="login_bottom_section">
                <div>
                  <label htmlFor="persist" className="form__persist">
                    Trust This Device
                  </label>
                  <input
                    className="form__checkbox"
                    id="persist"
                    type="checkbox"
                    onChange={togglePersist}
                    checked={persist}
                  />
                </div>

                <button className="btn login_btn" onClick={onSubmit}>
                  Log in
                </button>
                <section>
                  {errorMessage ? (
                    <p className="form_message error"> {errorMessage}</p>
                  ) : null}
                </section>
              </div>
            </div>
          </form>
        </FormProvider>

        <footer>
          <div className="footer_content">
            <hr />
            <div>
              <p>DON'T HAVE AN ACCOUNT</p>
              <button
                className="btn signup_btn"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                Sign ups
              </button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginForm;
