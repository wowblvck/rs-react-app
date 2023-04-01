import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from '../index';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  it('renders the error image', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const errorImage = screen.getByAltText('Error Image');
    expect(errorImage).toBeInTheDocument();
  });

  it('renders the error message', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const errorMessage = screen.getByText(/We can’t seem the page you are looking for/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the return home button', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const returnHomeButton = screen.getByRole('button', { name: /return home/i });
    expect(returnHomeButton).toBeInTheDocument();
  });
});
