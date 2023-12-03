import AddMovieToCollectionForm from '../components/AddMovieToCollectionsForm';
import { describe, expect, it, vi, beforeEach, beforeAll } from 'vitest';
import {
  setupMovieHandler,
  setupFailedAddMovieToCollection,
} from '../msw/mswHandler';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { MovieData } from '../msw/data_tests';
import renderWithProviders from '../../../utils/test-utils';
import { toast } from 'react-toastify';

describe('AddMovieToCollectionForm component handle success request ', () => {
  beforeEach(() => setupMovieHandler());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('Show toast success messages', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(toast, 'success');

    const { getByRole, findAllByRole } = renderWithProviders(
      <AddMovieToCollectionForm movie={MovieData.data} />
    );

    const checkboxes = await findAllByRole('checkbox');
    const submitButton = getByRole('button', { name: 'SUBMIT' });
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    await waitFor(async () => {
      await user.click(submitButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});

describe('AddMovieToCollectionForm component error handle', () => {
  beforeEach(() => setupFailedAddMovieToCollection());

  it('Show toast success messages', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(toast, 'error');

    const { getByRole, findAllByRole } = renderWithProviders(
      <AddMovieToCollectionForm movie={MovieData.data} />
    );

    const checkboxes = await findAllByRole('checkbox');
    const submitButton = getByRole('button', { name: 'SUBMIT' });
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);

    await waitFor(async () => {
      await user.click(submitButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});
