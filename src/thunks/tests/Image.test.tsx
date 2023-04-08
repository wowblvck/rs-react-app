import uploadImage from '../Image';
import { waitFor } from '@testing-library/react';
import { API_KEY, URL_IMAGE } from '../../constants/settings.config';

describe('Image Upload', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls fetch with correct parameters', async () => {
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    const context = new FormData();
    context.append('source', file);
    context.append('key', API_KEY);

    await uploadImage(file);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith(`${URL_IMAGE}`, {
        method: 'POST',
        body: context,
      });
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('throws an error when fetch fails', async () => {
    const errorMessage = 'Failed to fetch places data';
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error(errorMessage));
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    const context = new FormData();
    context.append('source', file);
    context.append('key', API_KEY);

    const error = await waitFor(() => {
      return expect(uploadImage(file)).rejects.toThrow(errorMessage);
    });

    expect(error).toBeDefined();
  });
});
