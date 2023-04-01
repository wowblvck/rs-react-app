import React from 'react';
import { render } from '@testing-library/react';
import CardItem from './CardItem';
import { mockPlaces } from '../../tests/mockData';

describe('CardItem', () => {
  it('renders correctly with provided data', () => {
    const { getByText, getByAltText } = render(<CardItem obj={mockPlaces[0]} />);

    expect(getByAltText(/^Card Image/)).toBeInTheDocument();
    expect(getByAltText('Profile Photo')).toBeInTheDocument();
    expect(getByText(mockPlaces[0].country)).toBeInTheDocument();
    expect(getByText(mockPlaces[0].location)).toBeInTheDocument();
    expect(getByText(mockPlaces[0].description)).toBeInTheDocument();
    expect(
      getByText(new RegExp(`${mockPlaces[0].author.first_name}.*${mockPlaces[0].author.last_name}`))
    ).toBeInTheDocument();
    expect(getByText(mockPlaces[0].date)).toBeInTheDocument();
  });
});
