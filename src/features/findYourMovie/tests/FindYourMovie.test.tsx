import FindYourMovie from '../pages/FindFourMovie';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import renderWithProviders from '../../../utils/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import {
  findByTestId,
  findByText,
  queryByTestId,
  waitFor,
} from '@testing-library/react';
import { MovieData } from '../../movie/msw/data_tests';
import {
  setupFailFindYourMovieHandle,
  setupFindYourMovieHandle,
} from '../msw/mswHandler';

describe('FindYourMovie component', () => {
  beforeEach(() => setupFindYourMovieHandle());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });
  it('should send query to api', async () => {
    const user = userEvent.setup();
    const { getByRole, findByTestId } = renderWithProviders(
      <MemoryRouter>
        <FindYourMovie />
      </MemoryRouter>
    );

    const searchButton = getByRole('button', { name: 'Search' });
    const textArea = getByRole('textbox');

    await user.type(textArea, 'Give me drama movie');
    await waitFor(async () => {
      await user.click(searchButton);
    });

    const foundMovie = await findByTestId('found_movie');
    expect(foundMovie).toBeInTheDocument();
  });

  it('should show loader when send to api', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByTestId, findByTestId } = renderWithProviders(
      <MemoryRouter>
        <FindYourMovie />
      </MemoryRouter>
    );

    const searchButton = getByRole('button', { name: 'Search' });
    const textArea = getByRole('textbox');

    await user.type(textArea, 'Give me drama movie');
    await user.click(searchButton);

    const loader = queryByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should show loader when send to api', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByTestId, findByTestId } = renderWithProviders(
      <MemoryRouter>
        <FindYourMovie />
      </MemoryRouter>
    );

    const searchButton = getByRole('button', { name: 'Search' });
    const textArea = getByRole('textbox');

    await user.type(textArea, 'Give me drama movie');
    await user.click(searchButton);

    const loader = queryByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});

describe('FindYourMovie component error handle', () => {
  beforeEach(() => setupFailFindYourMovieHandle());
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });
  it('should send query to api', async () => {
    const user = userEvent.setup();
    const { getByRole, findByText } = renderWithProviders(
      <MemoryRouter>
        <FindYourMovie />
      </MemoryRouter>
    );

    const searchButton = getByRole('button', { name: 'Search' });
    const textArea = getByRole('textbox');

    await user.type(textArea, 'Give me drama movie');
    await waitFor(async () => {
      await user.click(searchButton);
    });

    const errorMessage = await findByText('Error: Forbidden');
    expect(errorMessage).toBeInTheDocument();
  });
});
