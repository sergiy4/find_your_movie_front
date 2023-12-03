import {
  setupAuthHandler,
  setupRefreshFailedHandler,
} from '../../msw/mswHandler';
import { expect, describe, it, vi, beforeEach, beforeAll } from 'vitest';
import renderWithProviders from '../../../../utils/test-utils';
import '@testing-library/jest-dom';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { act, waitFor, screen } from '@testing-library/react';
import { routesConfig } from '../../../../data/routersConfig';
import { setupCollectionHandler } from '../../../collection/msw/mswHandler';
import { setupStore } from '../../../../app/store';

vi.mock('../../hooks/useAuth', () => {
  return {
    default: vi.fn(() => {
      return {
        userID: '655dde72b080d929bc479b33',
      };
    }),
  };
});

describe('PersistLogin component success refresh', () => {
  beforeEach(() => setupAuthHandler());
  beforeEach(() => setupCollectionHandler());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
    let container2 = document.createElement('div');
    container2.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  it('when persist is false, but user is logged ', () => {
    localStorage.setItem('FYM_persist', 'false');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/collections/sdffds'],
    });

    const { queryByTestId } = renderWithProviders(
      <RouterProvider router={router} />
    );

    const collectionPage = queryByTestId('collection');
    expect(collectionPage).toBeInTheDocument();
  });

  it('when persist is true, but user is not logged', async () => {
    localStorage.setItem('FYM_persist', 'true');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/collections/sdffds'],
    });

    const store = setupStore();
    act(() => {
      renderWithProviders(<RouterProvider router={router} />, { store });
    });

    let collectionComponent;
    await waitFor(async () => {
      collectionComponent = await screen.findByTestId('collection');
    });

    expect(store.getState().auth.token).toBe('sdfsdfe23f9rf0ke');
    expect(collectionComponent).toBeInTheDocument();
  });

  it('check loading component when a refresh request is sent', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/collections/sdffds'],
    });

    localStorage.setItem('FYM_persist', 'true');

    const { findByText } = renderWithProviders(
      <RouterProvider router={router} />
    );

    let loadingComponent = await findByText('LOADING . . .');

    expect(loadingComponent).toBeInTheDocument();
  });

  it('Render outlet when token exist and persist_login state is true', async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/collections/sdffds'],
    });

    localStorage.setItem('FYM_persist', 'true');
    const store = setupStore({ auth: { token: '123e2332r' } });

    const { findByTestId } = renderWithProviders(
      <RouterProvider router={router} />,
      { store }
    );

    let collectionComponent;
    await waitFor(async () => {
      collectionComponent = await findByTestId('collection');
    });

    expect(collectionComponent).toBeInTheDocument();
  });
});

describe('PersistLogin component failed refresh request', () => {
  beforeEach(() => setupRefreshFailedHandler());

  it('Show error message when refresh request failed', async () => {
    localStorage.setItem('FYM_persist', 'true');

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/collections/sdffds'],
    });
    const { findByText } = renderWithProviders(
      <RouterProvider router={router} />
    );
    const errorMessage = await findByText('Error: Unauthorize');

    expect(errorMessage).toBeInTheDocument();
  });
});
