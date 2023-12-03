import UpdateCollectionForm from '../components/UpdateCollection';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import {
  setupCollectionHandler,
  setupFailedUpdateCollectionHandlers,
} from '../msw/mswHandler';
import { waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('UpdateCollectionForm component', () => {
  beforeEach(() => setupCollectionHandler());
  it('checking whether the initial value and input are set', () => {
    const { getByDisplayValue } = renderWithProviders(
      <MemoryRouter>
        <UpdateCollectionForm
          isPrivate={true}
          name="collection_name_moon"
          _id="e32e23r"
        />
      </MemoryRouter>
    );

    const InputForm = getByDisplayValue('collection_name_moon');

    expect(InputForm).toBeInTheDocument();
  });

  it('check whether toast success messages are displayed', async () => {
    const spy = vi.spyOn(toast, 'success');

    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <UpdateCollectionForm
          isPrivate={true}
          name="collection_name_moon"
          _id="e32e23r"
        />
      </MemoryRouter>
    );

    const updateCollectionButton = getByRole('button');

    console.log(updateCollectionButton);
    await waitFor(async () => {
      await user.click(updateCollectionButton);
    });

    expect(spy).toBeCalledTimes(1);
  });
});

describe('UpdateCollectionForm component', () => {
  beforeEach(() => setupFailedUpdateCollectionHandlers());
  it('check whether toast error messages are displayed', async () => {
    const spy = vi.spyOn(toast, 'error');

    const user = userEvent.setup();

    const { getByRole } = renderWithProviders(
      <MemoryRouter>
        <UpdateCollectionForm
          isPrivate={true}
          name="collection_name_moon"
          _id="e32e23r"
        />
      </MemoryRouter>
    );

    const updateCollectionButton = getByRole('button');

    console.log(updateCollectionButton);
    await waitFor(async () => {
      await user.click(updateCollectionButton);
    });

    expect(spy).toHaveBeenCalled();
  });
});
