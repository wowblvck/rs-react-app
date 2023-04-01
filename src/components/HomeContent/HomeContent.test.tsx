import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import HomeContent from './HomeContent';
import { fetchPlaces } from '../../thunks';
import { mockPlaces } from '../../tests/mockData';

describe('HomeContent', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlaces),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the title', async () => {
    render(<HomeContent />);
    await waitFor(() => {
      const items = screen.queryAllByTestId('card-item');
      expect(items).toHaveLength(mockPlaces.length);
    });
    const titleElement = screen.getByText(/Find your place/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('fetches data successfully from the server', async () => {
    const data = await fetchPlaces();
    expect(data).toEqual(mockPlaces);
  });

  it('throws an error when the server response is an HTTP error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('HTTP error')));

    await expect(fetchPlaces()).rejects.toThrow('Error while loading database: Error: HTTP error');
  });
});
