import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';
import { cleanup } from '@testing-library/react';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  cleanup();
});
afterEach(() => {
  server.resetHandlers();
});
