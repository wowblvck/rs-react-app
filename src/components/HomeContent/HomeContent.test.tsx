import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HomeContent, { fetchPlaces } from './HomeContent';
import { mockData } from '../../tests/mockData';

describe('HomeContent', () => {
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

  it('renders the title', async () => {
    const { queryAllByTestId, getByText } = render(<HomeContent />);
    await waitFor(() => {
      const items = queryAllByTestId('card-item');
      expect(items).toHaveLength(mockData.length);
    });
    const titleElement = getByText(/Find your place/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('fetches data successfully from the server', async () => {
    const data = await fetchPlaces();

    expect(data).toEqual(mockData);
  });

  it('throws an error when the server response is an HTTP error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('HTTP error')));

    await expect(fetchPlaces()).rejects.toThrow('Error while loading database: Error: HTTP error');
  });
});
