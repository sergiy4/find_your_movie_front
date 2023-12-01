import CreateCollectionForm from '../components/CreateCollectionForm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import {
  setupCollectionHandler,
  setupFailedCreateCollectionHandlers,
} from '../msw/mswHandler';
import { waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';

describe('Create Collection Form component', () => {
  beforeEach(() => setupCollectionHandler());

  it('Create new collection', async () => {
    const spySuccess = vi.spyOn(toast, 'success');

    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <CreateCollectionForm />
    );

    const formInput = getByPlaceholderText('Name');
    await user.type(formInput, 'Knight');

    const createCollectionButton = getByRole('button');

    await waitFor(async () => {
      await user.click(createCollectionButton);
    });

    expect(spySuccess).toHaveBeenCalledTimes(1);
  });

  it('Show input error message when input is empty', async () => {
    const user = userEvent.setup();
    const { getByRole, findByText } = renderWithProviders(
      <CreateCollectionForm />
    );

    const createCollectionButton = getByRole('button');
    await waitFor(async () => {
      await user.click(createCollectionButton);
    });

    const errorMessageEl = await findByText('Name is required');
    expect(errorMessageEl).toBeInTheDocument();
  });

  it('Show input error message when input has Invalid characters', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole, findByText } = renderWithProviders(
      <CreateCollectionForm />
    );

    const formInput = getByPlaceholderText('Name');
    await user.type(formInput, 'ВАПВАПВ');

    const createCollectionButton = getByRole('button');
    await waitFor(async () => {
      await user.click(createCollectionButton);
    });

    const errorMessageEl = await findByText('Invalid characters');
    expect(errorMessageEl).toBeInTheDocument();
  });

  it('Show input error message when test so long', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole, findByText } = renderWithProviders(
      <CreateCollectionForm />
    );

    const formInput = getByPlaceholderText('Name');
    await user.type(
      formInput,
      '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
    );

    const createCollectionButton = getByRole('button');
    await waitFor(async () => {
      await user.click(createCollectionButton);
    });

    const errorMessageEl = await findByText(
      'Name must contain max 100 characters'
    );

    expect(errorMessageEl).toBeInTheDocument();
  });
});

describe('Create Collection Form component', () => {
  beforeEach(() => setupFailedCreateCollectionHandlers());
  it('Show error when create collection failed', async () => {
    const spyError = vi.spyOn(toast, 'error');
    const user = userEvent.setup();

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <CreateCollectionForm />
    );

    const formInput = getByPlaceholderText('Name');
    await user.type(formInput, 'Knight');

    const createCollectionButton = getByRole('button');
    await waitFor(async () => {
      await user.click(createCollectionButton);
    });

    expect(spyError).toHaveBeenCalledTimes(1);
  });
});
