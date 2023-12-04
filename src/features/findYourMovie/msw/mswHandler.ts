import { server } from '../../../../tests/server';
import { MovieData } from '../../movie/msw/data_tests';
import { HttpResponse, http, delay } from 'msw';

const findYourMovieHandler = [
  http.post('/FYM', async ({ request }) => {
    await delay(100);
    return HttpResponse.json(MovieData, { status: 200 });
  }),
];

export const setupFindYourMovieHandle = () => {
  server.use(...findYourMovieHandler);
};

export const setupFailFindYourMovieHandle = () => {
  server.use(
    http.post('/FYM', () => {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 400 });
    })
  );
};
