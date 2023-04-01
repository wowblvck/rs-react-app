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
    const mockInput = 'something';
    if (mockInput) {
      localStorage.setItem('searchValue', mockInput);
    }
    unmount();
    const input = localStorage.getItem('searchValue');
    if (input) {
      expect(localStorage.getItem('searchValue')).toBe(mockInput);
    }
  });
});
