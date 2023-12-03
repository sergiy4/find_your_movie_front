import LoginForm from '../../components/LoginForm';
import {
  setupAuthHandler,
  setupFailedLoginHandler,
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

describe('LoginForm Component input error messages', () => {
  it('Show error message "username and password is required" when input is empty', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const LoginButton = getByRole('button', { name: 'Log in' });

    await user.click(LoginButton);

    let usernameErrorMessage = getByText('Name is required');
    let passwordErrorMessage = getByText('Password is required');

    expect(usernameErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  it('Show error message "Invalid characters" ', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const LoginButton = getByRole('button', { name: 'Log in' });

    await user.type(usernameInput, 'івалущцза');
    await user.type(passwordInput, '+_)(((*(*жждвдз');
    await user.click(LoginButton);

    let usernameErrorMessage = getByText('Invalid characters');
    let passwordErrorMessage = getByText(
      'Password must contain upper and lower case letters, numbers and special characters'
    );

    expect(usernameErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});

describe('LoginForm Component handle success login', () => {
  beforeEach(() => setupAuthHandler());
  it('Navigate when user success logged', async () => {
    const user = userEvent.setup();

    const { getByRole, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const LoginButton = getByRole('button', { name: 'Log in' });

    await user.type(usernameInput, 'sergiy');
    await user.type(passwordInput, 'fvereffer23232@@SFGDFG');

    await waitFor(async () => {
      await user.click(LoginButton);
    });

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  it('Set token to redux store when user success logged', async () => {
    const user = userEvent.setup();

    const { store, getByRole, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const LoginButton = getByRole('button', { name: 'Log in' });

    await user.type(usernameInput, 'sergiy');
    await user.type(passwordInput, 'fvereffer23232@@SFGDFG');

    await waitFor(async () => {
      await user.click(LoginButton);
    });

    const storeState = store.getState();
    const tokenInSState = storeState.auth.token;

    expect(tokenInSState).toBe('sdfsdfe23f9rf0ke');
  });

  it('set localStore persist FYM_persist true', async () => {
    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const trustCheckbox = getByRole('checkbox');

    await waitFor(async () => {
      await user.click(trustCheckbox);
    });

    expect(localStorage.getItem('FYM_persist')).toBe('true');
    expect(localStorage.getItem('FYM_login')).toBe('true');
  });
});

describe('LoginForm Component handle error login', () => {
  beforeEach(() => setupFailedLoginHandler());

  it('Show error message from server', async () => {
    const user = userEvent.setup();

    const { getByRole, getByText, getByPlaceholderText } = renderWithProviders(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const LoginButton = getByRole('button', { name: 'Log in' });

    await user.type(usernameInput, 'sergiy');
    await user.type(passwordInput, 'fvereffer23232@@SFGDFG');

    await waitFor(async () => {
      await user.click(LoginButton);
    });

    const errorMessage = getByText('Error: invalid password');
    expect(errorMessage).toBeInTheDocument();
  });
});
