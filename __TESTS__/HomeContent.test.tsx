import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeContent from '../src/components/HomeContent/HomeContent';
import { Provider } from 'react-redux';
import { mswServer } from '../src/tests/setupTests';
import { rest } from 'msw';
import { URL, URLPath } from '../src/constants/settings.config';
import configureAppStore from '../src/store/store';

const store = configureAppStore();

describe('HomeContent', () => {
  test('renders an error message and a "Try again" button if there is an error fetching data', async () => {
    mswServer.use(
      rest.get(`${URL}/${URLPath.Places}`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <Provider store={store}>
        <HomeContent />
      </Provider>
    );
    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  test('should show a message if no places are found', async () => {
    mswServer.use(
      rest.get(`${URL}/${URLPath.Places}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );

    render(
      <Provider store={store}>
        <HomeContent />
      </Provider>
    );
    expect(await screen.findByText(/Places not found/)).toBeInTheDocument();
  });
});
