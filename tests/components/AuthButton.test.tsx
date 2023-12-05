import AuthButton from '../../src/components/AuthButton';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from '../../src/utils/test-utils';

describe('AuthButton componenet', () => {
  it('Show logout button when login state is true', () => {
    localStorage.setItem('FYM_login', 'true');

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    );

    const logoutButton = getByRole('button', { name: 'Logout' });
    console.log(logoutButton);
    expect(logoutButton).toBeInTheDocument();
  });
  it('Show login button when login state is false', () => {
    localStorage.setItem('FYM_login', 'false');

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <AuthButton />
      </MemoryRouter>
    );

    const loginButton = getByRole('button', { name: 'LOG IN' });
    expect(loginButton).toBeInTheDocument();
  });
});
