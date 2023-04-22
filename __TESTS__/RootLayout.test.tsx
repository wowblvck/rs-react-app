import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '../src/layouts/RootLayout';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureAppStore from '../src/store/store';

const store = configureAppStore();

describe('RootLayout', () => {
  test('renders the Header and Outlet components', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RootLayout />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
