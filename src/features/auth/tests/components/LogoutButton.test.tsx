import LogoutButton from '../../components/LogoutButton';
import {
  setupAuthHandler,
  setupFailedLogoutHandler,
} from '../../msw/mswHandler';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import renderWithProviders from '../../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

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

describe('LogoutButton component success logout handle', () => {
  beforeEach(() => setupAuthHandler());

  it('Navigate when logout success', async () => {
    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const logoutButton = getByRole('button', { name: 'Logout' });

    await waitFor(async () => {
      await user.click(logoutButton);
    });

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  it('Change localStore state when logout success', async () => {
    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const logoutButton = getByRole('button', { name: 'Logout' });

    await waitFor(async () => {
      await user.click(logoutButton);
    });

    expect(localStorage.getItem('FYM_login')).toBe('false');
  });

  it('Delete token from redux storage', async () => {
    const user = userEvent.setup();

    const { store, getByRole } = renderWithProviders(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>,
      {
        preloadedState: { auth: { token: 'sdfoiew21o3d9293d' } },
      }
    );

    const logoutButton = getByRole('button', { name: 'Logout' });

    await waitFor(async () => {
      await user.click(logoutButton);
    });

    expect(store.getState().auth.token).toBeFalsy();
  });
});

describe('LogoutButton component error logout handle', () => {
  beforeEach(() => setupFailedLogoutHandler());

  it('Show toast error message', async () => {
    const spy = vi.spyOn(toast, 'error');
    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const logoutButton = getByRole('button', { name: 'Logout' });

    await waitFor(async () => {
      await user.click(logoutButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});
