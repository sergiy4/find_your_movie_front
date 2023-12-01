import RandomCollectionList from '../components/RandomCollectionList';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import { setupCollectionHandler } from '../msw/mswHandler';
import { cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../tests/server';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('RandomCollection component', () => {
  beforeEach(() => setupCollectionHandler());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('Render random collections card', async () => {
    const { getByTestId, queryAllByTestId } = renderWithProviders(
      <MemoryRouter>
        <RandomCollectionList />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    const collectionCards = queryAllByTestId('collection_card');

    expect(collectionCards.length).toBe(5);
  });

  it('Render pagination component when count page biggest that one', async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <MemoryRouter>
        <RandomCollectionList />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId('loader'));
    const paginationComponent = queryByTestId('pagination_component');

    expect(paginationComponent).toBeInTheDocument();
  });
});
