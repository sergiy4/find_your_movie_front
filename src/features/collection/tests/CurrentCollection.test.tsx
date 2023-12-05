import CurrentCollection from '../components/CurrentCollection';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { cleanup } from '@testing-library/react';
import {
  setupCollectionHandler,
  setupFailedCollectionHandlers,
} from '../msw/mswHandler';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../../../tests/server';
import renderWithProviders from '../../../utils/test-utils';

// useParams mock
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useParams: () => ({
      collectionID: '123sdf',
    }),
  };
});

describe('Collection component', () => {
  beforeEach(() => setupCollectionHandler());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });
  afterEach(() => {
    cleanup();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it('display Collection data', async () => {
    const { findByTestId, unmount } = renderWithProviders(
      <MemoryRouter initialEntries={[`/collection/12d3o23`]}>
        <CurrentCollection />
      </MemoryRouter>
    );

    expect(await findByTestId('movie_card')).toBeDefined();
    unmount();
  });

  it('display loader when dataLoad', async () => {
    const { findByTestId, unmount } = renderWithProviders(
      <MemoryRouter initialEntries={[`/collections/12d3o23`]}>
        <CurrentCollection />
      </MemoryRouter>
    );
    expect(await findByTestId('loader')).toBeDefined();
    unmount();
  });

  it('display pagination when data Loaded', async () => {
    const { findByTestId, unmount } = renderWithProviders(
      <MemoryRouter initialEntries={[`/collections/12d3o23`]}>
        <CurrentCollection />
      </MemoryRouter>
    );
    expect(await findByTestId('pagination_component')).toBeDefined();
    unmount();
  });
});

describe('Collection component', () => {
  beforeEach(() => setupFailedCollectionHandlers());
  beforeEach(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('error handle Collection ', async () => {
    const { findByText, unmount } = renderWithProviders(
      <MemoryRouter initialEntries={[`/collection/12d3o23`]}>
        <CurrentCollection />
      </MemoryRouter>
    );

    expect(await findByText('FORBIDDEN')).toBeDefined();
    unmount();
  });
});
