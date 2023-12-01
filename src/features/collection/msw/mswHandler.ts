import { http, HttpResponse } from 'msw';
import { server } from '../../../../tests/server';
import {
  CurrentCollectionData,
  UserCollectionsData,
  RandomCollectionData,
} from './data_tests';

export const collectionHandler = [
  http.get('/collections/randomCollections', () => {
    return HttpResponse.json(RandomCollectionData, { status: 200 });
  }),
  http.get('/collections/:id', () => {
    return HttpResponse.json(CurrentCollectionData, { status: 200 });
  }),

  http.get('/collections', () => {
    return HttpResponse.json(UserCollectionsData, { status: 200 });
  }),

  http.post('/collections', async ({ request }) => {
    const newCollection = await request.json();
    return HttpResponse.json(newCollection, { status: 201 });
  }),

  http.delete('/collections/:id', ({ params }) => {
    return HttpResponse.json(
      { message: 'Collection was deleted' },
      { status: 200 }
    );
  }),

  http.patch('/collections/:id', async ({ request }) => {
    console.log('PATCH');
    const newCollection = await request.json();
    return HttpResponse.json(newCollection, { status: 200 });
  }),
];

export const setupCollectionHandler = () => {
  server.use(...collectionHandler);
};

export const setupFailedCollectionHandlers = () => {
  server.use(
    http.get('/collections/:id', () => {
      return HttpResponse.json({ message: 'FORBIDDEN' }, { status: 500 });
    })
  );
};

export const setupFailedCreateCollectionHandlers = () => {
  server.use(
    http.post('/collections', () => {
      return HttpResponse.json({ message: 'FORBIDDEN' }, { status: 500 });
    })
  );
};

export const setupFailedDeleteCollectionHandlers = () => {
  server.use(
    http.delete('/collections/:id', async ({ params }) => {
      console.log('DELETED');
      return HttpResponse.json({ message: 'server Error' }, { status: 500 });
    })
  );
};

export const setupFailedUpdateCollectionHandlers = () => {
  server.use(
    http.delete('/collections/:id', async ({ params }) => {
      console.log('DELETED');
      return HttpResponse.json({ message: 'server Error' }, { status: 500 });
    })
  );
};
