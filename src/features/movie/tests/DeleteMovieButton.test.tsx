import DeleteMovieButton from '../components/DeleteMovieButton';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  setupMovieHandler,
  setupFailedDeleteMovieFromCollection,
} from '../msw/mswHandler';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import renderWithProviders from '../../../utils/test-utils';
import { toast } from 'react-toastify';

describe('Delete Movie Button', () => {
  beforeEach(() => setupMovieHandler());
  it('Show success toast message', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(toast, 'success');

    const { getByRole } = renderWithProviders(
      <DeleteMovieButton collectionID="12d13uij2i3" movieID="s23dfi239" />
    );
    const deleteButton = getByRole('button');

    await waitFor(async () => {
      await user.click(deleteButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});

describe('Delete Movie Button', () => {
  beforeEach(() => setupFailedDeleteMovieFromCollection());
  it('Show error toast message', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(toast, 'error');

    const { getByRole } = renderWithProviders(
      <DeleteMovieButton collectionID="12d13uij2i3" movieID="s23dfi239" />
    );
    const deleteButton = getByRole('button');

    await waitFor(async () => {
      await user.click(deleteButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});
