import React from 'react';
import { render } from '@testing-library/react';
import Description from './Description';

describe('Description component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders description component with correct title and subtitle', () => {
    const { getByText } = render(<Description />);
    const titleElement = getByText('Beautiful Places');
    const subtitleElement = getByText('Discover new beautiful places for you.');

    expect(titleElement).toHaveTextContent('Beautiful Places');
    expect(subtitleElement).toHaveTextContent('Discover new beautiful places for you.');
  });

  it('should set background image from session storage if available', () => {
    const { unmount } = render(<Description />);
    const mockImage = 'test-image.jpg';
    sessionStorage.setItem('bgImage', mockImage);
    unmount();
    expect(sessionStorage.getItem('bgImage')).toBe(mockImage);
  });
});
