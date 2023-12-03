import MovieCard from '../components/MovieCard';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import renderWithProviders from '../../../utils/test-utils';
import { MovieCardData, MovieCardDataAuthUser } from '../msw/data_tests';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

vi.mock('../../auth/hooks/useAuth', () => {
  return {
    default: vi.fn(() => {
      return {
        userID: '655dde72b080d929bc479b33',
      };
    }),
  };
});

describe('MovieCard component', () => {
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('MovieCard does not show delete button when authorize user is not collections owner', () => {
    const { queryByRole } = render(
      <MemoryRouter>
        <MovieCard {...MovieCardData} />
      </MemoryRouter>
    );

    const deleteMovieButton = queryByRole('button', { name: 'DELETE' });
    expect(deleteMovieButton).not.toBeInTheDocument();
  });

  it('MovieCard  show delete button when authorize user is  collections owner', () => {
    const { queryByRole } = renderWithProviders(
      <MemoryRouter>
        <MovieCard {...MovieCardDataAuthUser} />
      </MemoryRouter>
    );

    const deleteMovieButton = queryByRole('button', { name: 'DELETE' });
    expect(deleteMovieButton).toBeInTheDocument();
  });
});
