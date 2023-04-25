import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import HomePage from '@/pages/HomePage/HomePage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import PostPage from '@/pages/PostPage/PostPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import configureAppStore from '@/store/store';

const store = configureAppStore();

describe('App', () => {
  test('renders homepage', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const title = screen.getByRole('heading', { level: 3, name: 'Find your place' });
    expect(title).toBeInTheDocument();
  });

  test('renders about page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </Provider>
    );
    const title = await screen.findByRole('heading', { name: /about/i });
    expect(title).toBeInTheDocument();
  });

  test('renders post page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostPage />
        </MemoryRouter>
      </Provider>
    );

    const title = await screen.findByRole('heading', { name: /Create a post/i });
    expect(title).toBeInTheDocument();
  });

  test('renders error page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </Provider>
    );

    const title = await screen.getByText(/We can’t seem the page you are looking for/i);
    expect(title).toBeInTheDocument();
  });
});
