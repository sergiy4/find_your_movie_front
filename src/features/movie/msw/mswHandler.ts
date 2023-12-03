import { server } from '../../../../tests/server';
import { http, HttpResponse } from 'msw';
import { MovieData, UserCollectionsData } from './data_tests';

const movieHandler = [
  http.get('/collections/all', () => {
    console.log('allll');
    return HttpResponse.json(UserCollectionsData, { status: 200 });
  }),
  http.get('/collections/:collectionID/movies/:movieID', () => {
    return HttpResponse.json(MovieData, { status: 200 });
  }),
  http.post('/collections/movies', () => {
    return HttpResponse.json(
      { message: 'Movie added to collection' },
      { status: 200 }
    );
  }),
  http.delete('/collections/:collectionID/movies/:movieID', () => {
    return HttpResponse.json(
      { message: 'Movie deleted from collection' },
      { status: 200 }
    );
  }),
];

export const setupMovieHandler = () => {
  server.use(...movieHandler);
};

export const setupFailedGetMovieHandler = () => {
  server.use(
    http.get('/collections/:collectionID/movies/:movieID', () => {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 401 });
    })
  );
};
export const setupFailedAddMovieToCollection = () => {
  server.use(
    http.post('/collections/movies', () => {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 401 });
    }),
    http.get('/collections/all', () => {
      console.log('allll');
      return HttpResponse.json(UserCollectionsData, { status: 200 });
    })
  );
};
export const setupFailedDeleteMovieFromCollection = () => {
  server.use(
    ...[
      http.delete('/collections/:collectionID/movies/:movieID', () => {
        return HttpResponse.json({ message: 'Forbidden' }, { status: 401 });
      }),
    ]
  );
};
