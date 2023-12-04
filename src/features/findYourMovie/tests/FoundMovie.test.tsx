import FoundMovie from '../components/FoundMovie';
import { beforeAll, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieData } from '../../movie/msw/data_tests';
import { MemoryRouter } from 'react-router-dom';

describe('FoundMovie component', () => {
  beforeAll(() => {
    // setup a DOM element as a render target
    let container = document.createElement('div');
    container.setAttribute('id', 'portal');
    document.body.appendChild(container);
  });

  it('Correctly display values', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <FoundMovie {...MovieData.data} />
      </MemoryRouter>
    );

    const title = queryByText('The Shawshank Redemption');
    const genresString = queryByText('Drama, Crime');
    const releasedata = queryByText('year - 1994-09-23');
    const overview = queryByText(MovieData.data.overview);

    expect(title).toBeInTheDocument();
    expect(genresString).toBeInTheDocument();
    expect(releasedata).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
  });
});
