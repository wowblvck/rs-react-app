import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { HomePage } from '../index';
import { mockPlaces } from '../../tests/mockData';
import { getPlaces } from '../../thunks';

describe('HomePage', () => {
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

  it('renders the Description and HomeContent components', async () => {
    const result = await getPlaces();
    const { getByTestId } = render(<HomePage />);
    await waitFor(() => {
      expect(result).toEqual(mockPlaces);
    });
    const description = getByTestId('description');
    expect(description).toBeInTheDocument();
  });
});
