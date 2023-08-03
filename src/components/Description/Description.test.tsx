import React from 'react';
import { render } from '@testing-library/react';
import Description from './Description';

describe('Description component', () => {
  it('renders description component with correct title and subtitle', () => {
    const { getByText } = render(<Description />);
    const titleElement = getByText('Beautiful Places');
    const subtitleElement = getByText('Discover new beautiful places for you.');

    expect(titleElement).toHaveTextContent('Beautiful Places');
    expect(subtitleElement).toHaveTextContent('Discover new beautiful places for you.');
  });
});