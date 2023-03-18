import React from 'react';
import { render } from '@testing-library/react';
import CardItem from './CardItem';
import { PlacesInfo } from '../../interfaces/Places.interface';

describe('CardItem component', () => {
  const mockData: PlacesInfo = {
    id: 1,
    country: 'Turkey',
    location: 'Istanbul',
    image: 'https://example.com/image.jpg',
    description: 'Lorem ipsum dolor sit amet',
    author: {
      id: 321,
      first_name: 'John',
      last_name: 'Doe',
      avatar: 'https://example.com/avatar.jpg',
    },
    date: '2022-03-17T13:00:00.000Z',
  };
  it('renders correctly with provided data', () => {
    const { getByText, getByAltText } = render(<CardItem obj={mockData} />);

    expect(getByAltText(/^Card Image/)).toBeInTheDocument();
    expect(getByAltText('Profile Photo')).toBeInTheDocument();
    expect(getByText(mockData.country)).toBeInTheDocument();
    expect(getByText(mockData.location)).toBeInTheDocument();
    expect(getByText(mockData.description)).toBeInTheDocument();
    expect(
      getByText(new RegExp(`${mockData.author.first_name}.*${mockData.author.last_name}`))
    ).toBeInTheDocument();
    expect(getByText(mockData.date)).toBeInTheDocument();
  });
});
