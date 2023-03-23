import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import React from 'react';
import AboutPage from './pages/AboutPage';
import PostPage from './pages/PostPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { mockData } from './tests/mockData';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders homepage', async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const title = screen.getByRole('heading', { level: 3, name: 'Find your place' });
      expect(title).toBeInTheDocument();
    });
  });

  it('renders about page', async () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const title = await screen.findByRole('heading', { name: /about/i });
    expect(title).toBeInTheDocument();
  });

  it('renders post page', async () => {
    render(
      <MemoryRouter>
        <PostPage />
      </MemoryRouter>
    );
    const title = await screen.findByRole('heading', { name: /Create a post/i });

    expect(title).toBeInTheDocument();
  });

  it('renders error page', async () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const title = screen.getByText(/We can’t seem the page you are looking for/i);
    expect(title).toBeInTheDocument();
  });
});
