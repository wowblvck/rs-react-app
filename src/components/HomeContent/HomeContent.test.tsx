import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeContent from './HomeContent';
import { Provider } from 'react-redux';
import { mswServer } from '../../tests/setupTests';
import { rest } from 'msw';
import { URL, URLPath } from '../../constants/settings.config';
import configureAppStore from '../../store/store';

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
