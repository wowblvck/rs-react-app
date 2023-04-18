import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CardItem from './CardItem';
import { mockData } from '../../tests/mocks/mockData';
import { Provider } from 'react-redux';
import CardPopup from '../CardPopup/CardPopup';
import configureAppStore from '../../store/store';

const store = configureAppStore();

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

  test('call popup on click', async () => {
    const onClose = vi.fn();
    render(
      <Provider store={store}>
        <CardItem obj={mockData[0]} />
        <CardPopup itemId={mockData[0].id} onClose={onClose} />
      </Provider>
    );

    const item = screen.getByTestId('card-item');
    fireEvent.click(item);

    await waitFor(() => {
      expect(screen.getByText(mockData[0].location)).toBeInTheDocument();
    });
  });
});
