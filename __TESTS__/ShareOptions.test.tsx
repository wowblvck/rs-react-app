import React from 'react';
import ShareOptions from '../src/components/ShareOptions/ShareOptions';
import { render, screen } from '@testing-library/react';

describe('ShareOptions', () => {
  test('should render without errors', () => {
    render(<ShareOptions />);
    expect(screen.getByTestId('share-options')).toBeInTheDocument();
  });
});
