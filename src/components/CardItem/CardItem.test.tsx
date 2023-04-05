import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CardItem from './CardItem';
import { mockPlaces } from '../../tests/mockData';

describe('CardItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('renders correctly with provided data', async () => {
    const { getByText, getByAltText, getAllByText, getAllByAltText } = render(
      <CardItem obj={mockPlaces[0]} isLoading />
    );

    await waitFor(() => {
      expect(getByAltText(/^Card Image/)).toBeInTheDocument();
      expect(getAllByAltText('Profile Photo')).toHaveLength(2);
      expect(getAllByText(mockPlaces[0].country)).toHaveLength(2);
      expect(getAllByText(mockPlaces[0].location)).toHaveLength(2);
      expect(getAllByText(mockPlaces[0].description)).toHaveLength(2);
      expect(
        getAllByText(
          new RegExp(`${mockPlaces[0].author.first_name}.*${mockPlaces[0].author.last_name}`)
        )
      ).toHaveLength(2);
      expect(getAllByText(mockPlaces[0].date)).toHaveLength(2);
    });
  });
});
