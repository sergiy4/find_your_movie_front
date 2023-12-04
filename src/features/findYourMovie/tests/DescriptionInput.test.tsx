import DescriptionInput from '../components/DescriptionInput';
import { describe, expect, it, vi } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import userEvent from '@testing-library/user-event';
import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

type findMovie = MutationTrigger<
  MutationDefinition<
    string,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    'Collection',
    unknown,
    'api'
  >
>;

describe('DescriptionInput component', () => {
  it('Make request if textBox not empty', async () => {
    const user = userEvent.setup();
    const mock = vi.fn(() => {});
    const { getByRole } = renderWithProviders(
      <DescriptionInput
        isLoading={false}
        findMovie={mock as unknown as findMovie}
      />
    );

    const searchButton = getByRole('button');
    const textArea = getByRole('textbox');
    await user.type(textArea, 'Get super movie');
    await user.click(searchButton);

    expect(mock).toBeCalledTimes(1);
  });

  it('the request does not occur if the input is empty', async () => {
    const user = userEvent.setup();
    const mock = vi.fn(() => {});
    const { getByRole } = renderWithProviders(
      <DescriptionInput
        isLoading={false}
        findMovie={mock as unknown as findMovie}
      />
    );

    const searchButton = getByRole('button');
    await user.click(searchButton);
    user.keyboard;

    expect(mock).toBeCalledTimes(0);
  });

  it('if the description value is stored in the storage , it will be set as the default value', () => {
    const mock = vi.fn(() => {});
    const { getByDisplayValue } = renderWithProviders(
      <DescriptionInput
        isLoading={false}
        findMovie={mock as unknown as findMovie}
      />,
      {
        preloadedState: {
          fym: {
            input: { currentDescription: 'Get super movie' },
            movie: {},
          },
        },
      }
    );

    const textArea = getByDisplayValue('Get super movie');

    expect(textArea).toBeInTheDocument();
  });

  it('Make request if enter key pressed', async () => {
    const user = userEvent.setup();
    const mock = vi.fn(() => {});
    const { getByRole } = renderWithProviders(
      <DescriptionInput
        isLoading={false}
        findMovie={mock as unknown as findMovie}
      />
    );

    const textArea = getByRole('textbox');
    await user.type(textArea, 'Get super movie');
    await user.keyboard('{Enter>}{/Enter}');

    expect(mock).toBeCalledTimes(1);
  });
});
