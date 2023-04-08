import { waitFor } from '@testing-library/react';
import { mockPlaces } from '../../tests/mockData';
import { addPlace, getPlaces } from '../';
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
    const someSearch = 'something' || '';
    const result = await getPlaces(someSearch);

    await waitFor(() => {
      expect(result).toEqual(mockPlaces);
      expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}?q=${someSearch}`);
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an error if the response status is not ok', async () => {
    const mockErrorResponse = {
      status: 404,
      statusText: 'Not Found',
    };
    const someSearch = 'something' || '';

    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ...mockErrorResponse,
        ok: false,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(getPlaces(someSearch)).rejects.toThrow(
      'Error fetching places: error status - 404'
    );
  });

  it('throws an error when failed to fetch places data', async () => {
    const errorMessage = 'Failed to fetch places data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const someSearch = 'something' || '';
    const error = await waitFor(() => {
      return expect(getPlaces(someSearch)).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
    expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}?q=${someSearch}`);
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns the newly created place', async () => {
    const newPlace = await addPlace(mockPlaces[0]);

    await waitFor(() => {
      expect(newPlace).toEqual(mockPlaces);
    });
  });

  it('throws an error when failed to fetch places add', async () => {
    const errorMessage = 'Failed to fetch places data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));

    const error = await waitFor(() => {
      return expect(addPlace(mockPlaces[0])).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
  });
});
