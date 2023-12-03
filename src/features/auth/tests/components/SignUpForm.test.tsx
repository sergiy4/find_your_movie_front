import SignUpForm from '../../components/SignUpForm';
import {
  setupAuthHandler,
  setupFailedLoginHandler,
  setupSignUpFailedHandler,
} from '../../msw/mswHandler';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import renderWithProviders from '../../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

const mockedUsedNavigate = vi.fn(() => {
  console.log('NAVIGATE');
});
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('SignUpForm Component input error messages', () => {
  it('Show error message "username and password is required" when input is empty', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    const SignUpButton = getByRole('button', { name: 'SignUp' });

    await user.click(SignUpButton);

    let usernameErrorMessage = getByText('Name is required');
    let passwordErrorMessage = getByText('Password is required');

    expect(usernameErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it('Show error message "Invalid characters" ', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const SignUpButton = getByRole('button', { name: 'SignUp' });

    await user.type(usernameInput, 'івалущцза');
    await user.type(passwordInput, '+_)(((*(*жждвдз');
    await user.click(SignUpButton);

    let usernameErrorMessage = getByText('Invalid characters');
    let passwordErrorMessage = getByText(
      'Password must contain upper and lower case letters, numbers and special characters'
    );

    expect(usernameErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});

describe('SignUpForm Component handle success login', () => {
  beforeEach(() => setupAuthHandler());
  it('Navigate when user success logged', async () => {
    const user = userEvent.setup();

    const { getByRole, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const SignUpButton = getByRole('button', { name: 'SignUp' });

    await user.type(usernameInput, 'sergiy');
    await user.type(passwordInput, 'fvereffer23232@@SFGDFG');

    await waitFor(async () => {
      await user.click(SignUpButton);
    });

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});

describe('SignUp error request', () => {
  beforeEach(() => setupSignUpFailedHandler());
  it('Show error message', async () => {
    const user = userEvent.setup();

    const { getByRole, getByPlaceholderText, getByText } = renderWithProviders(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const SignUpButton = getByRole('button', { name: 'SignUp' });

    await user.type(usernameInput, 'sergiy');
    await user.type(passwordInput, 'fvereffer23232@@SFGDFG');

    await waitFor(async () => {
      await user.click(SignUpButton);
    });

    const errorMessage = getByText('Error: SERVER error');

    expect(errorMessage).toBeInTheDocument();
  });
});
