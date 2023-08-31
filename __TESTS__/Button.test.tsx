import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button/Button';

describe('Button Component', () => {
  test('renders button text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('applies custom class name', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('disables button when loading', () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
  });
});
