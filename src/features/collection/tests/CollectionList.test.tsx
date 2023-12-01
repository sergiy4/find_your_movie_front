import CollectionList from '../components/CollectionList';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import { setupCollectionHandler } from '../msw/mswHandler';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('CollectionList component', () => {
  beforeEach(() => setupCollectionHandler());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('Render collections card', async () => {
    const { getByTestId, queryAllByTestId } = renderWithProviders(
      <MemoryRouter>
        <CollectionList />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId('loader'));

    const collectionCards = queryAllByTestId('collection_card');

    expect(collectionCards.length).toBe(5);
  });

  it('Render pagination component when count page biggest that one', async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <MemoryRouter>
        <CollectionList />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByTestId('loader'));
    const paginationComponent = queryByTestId('pagination_component');

    expect(paginationComponent).toBeInTheDocument();
  });

  it('Open Modal when user clicked create collection button', async () => {
    const user = userEvent.setup();
    const { getByTestId } = renderWithProviders(
      <MemoryRouter>
        <CollectionList />
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => getByTestId('loader'));
    const CreateCollectionButton = getByTestId('modal_button');

    await user.click(CreateCollectionButton);
    expect(getByTestId('create_collection_form')).toBeInTheDocument();
  });
});
