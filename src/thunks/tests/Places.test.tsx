import { waitFor } from '@testing-library/react';
import { mockPlaces } from '../../tests/mockData';
import { getPlaces } from '../';
import { URL, URLPath } from '../../constants/settings.config';

describe('fetchPlaces', () => {
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

  it('fetches places data and returns an array of places', async () => {
    const result = await getPlaces();

    await waitFor(() => {
      expect(result).toEqual(mockPlaces);
      expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}`);
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('throws an error when failed to fetch places data', async () => {
    const errorMessage = 'Failed to fetch places data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const error = await waitFor(() => {
      return expect(getPlaces()).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
    expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}`);
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
