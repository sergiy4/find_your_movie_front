import { server } from '../../../../tests/server';
import { http, HttpResponse } from 'msw';

const authHandler = [
  http.post('/auth/login', () => {
    const accessToken = 'sdfsdfe23f9rf0ke';
    return HttpResponse.json({ accessToken }, { status: 200 });
  }),

  http.post('/auth/logout', () => {
    return HttpResponse.json({ message: 'Cookie cleared' });
  }),

  http.get('/auth/refresh', () => {
    const accessToken = 'sdfsdfe23f9rf0ke';
    return HttpResponse.json({ accessToken }, { status: 200 });
  }),
  http.post('/auth/signUp', () => {
    return HttpResponse.json(null, { status: 200 });
  }),
];

export const setupAuthHandler = () => {
  server.use(...authHandler);
};

export const setupFailedLoginHandler = () => {
  server.use(
    http.post('/auth/login', () => {
      const message = 'invalid password';
      return HttpResponse.json({ message }, { status: 401 });
    })
  );
};

export const setupFailedLogoutHandler = () => {
  server.use(
    http.post('/auth/logout', () => {
      const message = 'Logout failed';
      return HttpResponse.json({ message }, { status: 401 });
    })
  );
};

export const setupRefreshFailedHandler = () => {
  server.use(
    http.get('/auth/refresh', () => {
      const message = 'Unauthorize';
      return HttpResponse.json({ message }, { status: 401 });
    })
  );
};

export const setupSignUpFailedHandler = () => {
  server.use(
    http.post('/auth/signUp', () => {
      return HttpResponse.json({ message: 'SERVER error' }, { status: 500 });
    })
  );
};
