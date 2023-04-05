import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { HomePage, AboutPage, PostPage, ErrorPage } from './pages';
import { mockPlaces } from './tests/mockData';
import { act } from 'react-dom/test-utils';
import { getPlaces } from './thunks';

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPlaces),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders homepage', async () => {
    await getPlaces();
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const title = screen.getByRole('heading', { level: 3, name: 'Find your place' });
      expect(title).toBeInTheDocument();
    });
  });

  it('renders about page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );
    });

    const title = await screen.findByRole('heading', { name: /about/i });
    expect(title).toBeInTheDocument();
  });

  it('renders post page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PostPage />
        </MemoryRouter>
      );
    });

    const title = await screen.findByRole('heading', { name: /Create a post/i });
    expect(title).toBeInTheDocument();
  });

  it('renders error page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      );
    });

    const title = screen.getByText(/We can’t seem the page you are looking for/i);
    expect(title).toBeInTheDocument();
  });
});
