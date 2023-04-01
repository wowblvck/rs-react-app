import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioForm } from '../index';
import { fireEvent } from '@testing-library/react';

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];

const props = {
  register: vi.fn(),
  error: {
    type: 'required',
    message: 'Select category',
  },
};

describe('FormRadio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders radio form with options', () => {
    render(<RadioForm {...props} name="category" items={categories} />);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(categories.length);
  });

  it('calls register function when radio button is clicked', () => {
    render(<RadioForm {...props} items={categories} name="category" />);
    const radioButtons = screen.getAllByRole('radio');
    fireEvent.click(radioButtons[0]);
    expect(props.register).toHaveBeenCalledWith('category');
  });
});
