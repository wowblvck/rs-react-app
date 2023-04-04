import { waitFor } from '@testing-library/react';
import { mockCountries } from '../../tests/mockData';
import { fetchCountries } from '../';

describe('fetchCountries', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCountries),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches countries data and returns an array of countries', async () => {
    const result = await fetchCountries();

    expect(result).toEqual(mockCountries);
    expect(window.fetch).toHaveBeenCalledWith('/countries.json');
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error when failed to fetch countries data', async () => {
    const errorMessage = 'Failed to fetch countries data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const error = await waitFor(() => {
      return expect(fetchCountries()).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
    expect(window.fetch).toHaveBeenCalledWith('/countries.json');
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
