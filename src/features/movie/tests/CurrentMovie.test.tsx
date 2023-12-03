import CurrentMovie from '../components/CurrentMovie';
import { MovieData } from '../msw/data_tests';
import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CurrentMovie component', () => {
  it('Correct render currentMovie', () => {
    const { queryByText } = render(<CurrentMovie {...MovieData.data} />);

    const title = queryByText('The Shawshank Redemption');
    const genresString = queryByText('Drama, Crime');
    const releasedata = queryByText('1994-09-23');

    expect(title).toBeInTheDocument();
    expect(genresString).toBeInTheDocument();
    expect(releasedata).toBeInTheDocument();
  });
});
