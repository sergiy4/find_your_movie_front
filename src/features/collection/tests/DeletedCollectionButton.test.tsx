import DeleteButton from '../components/DeleteCollectionButton';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import {
  setupCollectionHandler,
  setupFailedDeleteCollectionHandlers,
} from '../msw/mswHandler';
import { waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';

describe('Delete button component', () => {
  beforeEach(() => setupCollectionHandler());

  it('Show toast when collection deleted', async () => {
    const spy = vi.spyOn(toast, 'success');
    const user = userEvent.setup();
    const { getByRole } = renderWithProviders(<DeleteButton id="12313" />);

    const deleteButton = getByRole('button');
    await waitFor(async () => {
      await user.click(deleteButton);
    });

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('Delete button component', () => {
  beforeEach(() => setupFailedDeleteCollectionHandlers());

  it('Show toast when collection failed deleted', async () => {
    const spy = vi.spyOn(toast, 'error');
    const user = userEvent.setup();
    const { getByRole } = renderWithProviders(<DeleteButton id="12313" />);

    const deleteButton = getByRole('button');
    await waitFor(async () => {
      await user.click(deleteButton);
    });

    expect(spy).toHaveBeenCalledOnce();
  });
});
