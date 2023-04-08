import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import HomeContent from './HomeContent';
import { getPlaces } from '../../thunks';
import { mockPlaces } from '../../tests/mockData';
import { URL, URLPath } from '../../constants/settings.config';
import { act } from 'react-dom/test-utils';

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
    const searchValue = 'somesearch' || '';
    const data = await getPlaces(searchValue);

    await waitFor(() => {
      expect(data).toEqual(mockPlaces);
      expect(window.fetch).toHaveBeenCalledWith(`${URL}/${URLPath.Places}?q=${searchValue}`);
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('throws an error when the server response is an HTTP error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('HTTP error')));
    const searchValue = 'somesearch' || '';
    await expect(getPlaces(searchValue)).rejects.toThrow('Error fetching places: HTTP error');
  });

  it('should show an error message if the fetch fails', async () => {
    const searchValue = 'somesearch' || '';
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('HTTP error')));

    act(() => {
      render(<HomeContent />);
    });
    await waitFor(() => {
      expect(getPlaces(searchValue)).rejects.toThrow('Error fetching places: HTTP error');
      expect(screen.getByText('Something went wrong. Please try again!')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Try again'));
    });
  });

  it('should show a message if no places are found', async () => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    );
    act(() => {
      render(<HomeContent />);
    });
    await waitFor(() =>
      expect(screen.getByText('Places not found. Refine your search!')).toBeInTheDocument()
    );
  });
});
