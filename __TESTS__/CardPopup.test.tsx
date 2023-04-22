import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CardPopup from '../src/components/CardPopup/CardPopup';
import { mockData } from '../src/tests/mocks/mockData';
import { Provider } from 'react-redux';
import configureAppStore from '../src/store/store';

const store = configureAppStore();

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
