import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import HomeContent from './HomeContent';
import { getPlaces } from '../../thunks';
import { mockPlaces } from '../../tests/mockData';
import { URL, URLPath } from '../../constants/settings.config';

describe('HomeContent', () => {
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
    const data = await getPlaces();

    await waitFor(() => {
      expect(data).toEqual(mockPlaces);
      expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}`);
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('throws an error when the server response is an HTTP error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('HTTP error')));

    await expect(getPlaces()).rejects.toThrow('Error fetching places: HTTP error');
  });
});
