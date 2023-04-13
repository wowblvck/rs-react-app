import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CardPopup from './CardPopup';
import { mockData } from '../../tests/mocks/mockData';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('CardPopup', () => {
  test('should render the popup when isVisible is true', async () => {
    const onClose = vi.fn();
    render(
      <Provider store={store}>
        <CardPopup itemId={mockData[0].id} onClose={onClose} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockData[0].location)).toBeInTheDocument();
    });
  });
});
