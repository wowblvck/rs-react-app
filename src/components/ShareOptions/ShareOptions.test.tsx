import React from 'react';
import ShareOptions from './ShareOptions';
import { render } from '@testing-library/react';

describe('ShareOptions', () => {
  it('should render without errors', () => {
    const { getByTestId } = render(<ShareOptions />);
    expect(getByTestId('share-options')).toBeInTheDocument();
  });
});
