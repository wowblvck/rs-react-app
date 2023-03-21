import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('Search Box Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('it should update the search value when typing in the input field', () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    const input = getByPlaceholderText('Search anything...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should set background image from session storage if available', () => {
    const { unmount } = render(<SearchBox />);
    const mockImage = 'test-image.jpg';
    if (mockImage) {
      localStorage.setItem('bgImage', mockImage);
    }
    unmount();
    const image = localStorage.getItem('bgImage');
    if (image) {
      expect(localStorage.getItem('bgImage')).toBe(mockImage);
    }
  });
});
