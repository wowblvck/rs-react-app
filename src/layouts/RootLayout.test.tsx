import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from './RootLayout';
import { MemoryRouter } from 'react-router-dom';

describe('RootLayout', () => {
  it('renders the Header and Outlet components', () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );
    const header = getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(getByTestId('outlet')).toBeInTheDocument();
  });
});
