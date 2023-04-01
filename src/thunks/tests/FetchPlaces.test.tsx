import { waitFor } from '@testing-library/react';
import { mockPlaces } from '../../tests/mockData';
import { fetchPlaces } from '../';

describe('fetchPlaces', () => {
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

  it('fetches places data and returns an array of places', async () => {
    const result = await fetchPlaces();

    expect(result).toEqual(mockPlaces);
    expect(window.fetch).toHaveBeenCalledWith('/db.json');
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error when failed to fetch places data', async () => {
    const errorMessage = 'Failed to fetch places data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const error = await waitFor(() => {
      return expect(fetchPlaces()).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
    expect(window.fetch).toHaveBeenCalledWith('/db.json');
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
