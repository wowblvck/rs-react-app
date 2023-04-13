import React from 'react';
import { render, screen } from '@testing-library/react';
import CardItem from './CardItem';
import { mockData } from '../../tests/mocks/mockData';

describe('CardItem', () => {
  test('renders correctly with provided data', async () => {
    render(<CardItem obj={mockData[0]} />);

    expect(screen.getByAltText(/^Card Image/)).toBeInTheDocument();
    expect(screen.getAllByAltText('Profile Photo')).toHaveLength(1);
    expect(screen.getAllByText(mockData[0].country)).toHaveLength(1);
    expect(screen.getAllByText(mockData[0].location)).toHaveLength(1);
    expect(screen.getAllByText(mockData[0].description)).toHaveLength(1);
    expect(
      screen.getAllByText(
        new RegExp(`${mockData[0].author.first_name}.*${mockData[0].author.last_name}`)
      )
    ).toHaveLength(1);
    expect(screen.getAllByText(mockData[0].date)).toHaveLength(1);
  });
});
