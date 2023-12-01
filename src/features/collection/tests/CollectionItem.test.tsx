import CollectionItem from '../components/CollectionItem';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from '../../../utils/test-utils';
import '@testing-library/jest-dom';

// preloadStateLoginUser
vi.mock('../../auth/hooks/useAuth', () => {
  return {
    default: vi.fn(() => {
      return {
        userID: '655dde72b080d929bc479b33',
      };
    }),
  };
});

describe('Collection card component', async () => {
  it('render the delete button when the id of the collection owner is not the same as the authorized user', async () => {
    const { queryByRole } = renderWithProviders(
      <MemoryRouter>
        <CollectionItem name="collection_name" userID="123123" _id="" />,
      </MemoryRouter>
    );
    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  it('render the delete button when the id of the collection owner is the same as the authorized user', () => {
    const { queryByRole } = renderWithProviders(
      <MemoryRouter>
        <CollectionItem
          name="collection_name"
          userID="655dde72b080d929bc479b33"
          _id=""
        />
      </MemoryRouter>
    );

    expect(queryByRole('button')).toBeInTheDocument();
  });
});
