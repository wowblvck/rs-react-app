import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('Search Box Component', () => {
  it('it should update the search value when typing in the input field', () => {
    const { getByPlaceholderText } = render(<SearchBox />);
    const input = getByPlaceholderText('Search anything...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});
