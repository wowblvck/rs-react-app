import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { HomePage } from '../index';
import { mockPlaces } from '../../tests/mockData';

describe('HomePage', () => {
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

  it('renders the Description and HomeContent components', async () => {
    const { queryAllByTestId, getByTestId } = render(<HomePage />);
    await waitFor(() => {
      const items = queryAllByTestId('card-item');
      expect(items).toHaveLength(mockPlaces.length);
    });
    const description = getByTestId('description');
    expect(description).toBeInTheDocument();
  });
});
