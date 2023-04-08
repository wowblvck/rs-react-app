import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('Search Box Component', () => {
  it('renders a search input and a submit button', () => {
    render(<SearchBox />);
    const searchInput = screen.getByPlaceholderText('Search anything...');
    expect(searchInput).toBeInTheDocument();
  });

  it('saves search value to local storage when input value changes', () => {
    const { unmount } = render(<SearchBox />);
    const searchInput = screen.getByPlaceholderText('Search anything...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    unmount();
    expect(localStorage.getItem('searchValue')).toEqual('test');
  });
});
