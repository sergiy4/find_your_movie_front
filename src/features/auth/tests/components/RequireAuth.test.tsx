import RequireAuth from '../../components/RequireAuth';
import { expect, describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { act, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import reactRouter from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const mockedUsedNavigate = vi.fn(() => {});

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    Navigate: () => mockedUsedNavigate(),
  };
});

vi.mock('../../hooks/useAuth');

describe('RequireAuth component', () => {
  it('Show children component when user is Authorize', () => {
    vi.mocked(useAuth).mockReturnValue({
      userID: '655dde72b080d929bc479b33',
    });
    const { getByText } = render(
      <MemoryRouter>
        <RequireAuth>
          <div>Children component</div>
        </RequireAuth>
      </MemoryRouter>
    );

    const childrenComponent = getByText('Children component');
    expect(childrenComponent).toBeInTheDocument();
  });

  it('Navigate to Login page when user is not authorize', async () => {
    vi.mocked(useAuth).mockReturnValue({
      userID: '',
    });
    render(
      <MemoryRouter>
        <RequireAuth>
          <div>Children component</div>
        </RequireAuth>
      </MemoryRouter>
    );

    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});
