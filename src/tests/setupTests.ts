import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import nodeFetch, { Request, Response } from 'node-fetch';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

//@ts-ignore
global.fetch = nodeFetch;
//@ts-ignore
global.Request = Request;
//@ts-ignore
global.Response = Response;

expect.extend(matchers);

beforeAll(() => mswServer.listen());
afterAll(() => mswServer.close());

afterEach(() => {
  cleanup();
  mswServer.resetHandlers();
});

export const mswServer = setupServer(...handlers);
