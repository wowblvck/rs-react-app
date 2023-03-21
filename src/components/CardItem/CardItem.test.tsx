import React from 'react';
import { render } from '@testing-library/react';
import CardItem from './CardItem';
import { mockData } from '../../tests/mockData';

describe('CardItem component', () => {
  it('renders correctly with provided data', () => {
    const { getByText, getByAltText } = render(<CardItem obj={mockData[0]} />);

    expect(getByAltText(/^Card Image/)).toBeInTheDocument();
    expect(getByAltText('Profile Photo')).toBeInTheDocument();
    expect(getByText(mockData[0].country)).toBeInTheDocument();
    expect(getByText(mockData[0].location)).toBeInTheDocument();
    expect(getByText(mockData[0].description)).toBeInTheDocument();
    expect(
      getByText(new RegExp(`${mockData[0].author.first_name}.*${mockData[0].author.last_name}`))
    ).toBeInTheDocument();
    expect(getByText(mockData[0].date)).toBeInTheDocument();
  });
});
