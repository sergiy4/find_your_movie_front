import CollectionList from '../components/CollectionsListForForm';
import { describe, expect, it, beforeEach } from 'vitest';
import { setupMovieHandler } from '../msw/mswHandler';
import renderWithProviders from '../../../utils/test-utils';

describe('CollectionList component handle success request', () => {
  beforeEach(() => setupMovieHandler());
  it('Render checkboxes when request is success', async () => {
    const { findAllByRole } = renderWithProviders(
      <CollectionList setSelectedCollection={() => {}} />
    );

    const checkboxes = await findAllByRole('checkbox');

    expect(checkboxes.length).toBe(5);
  });
});
