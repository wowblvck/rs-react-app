import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormText } from '@/components/PostForm/modules';
import { fireEvent } from '@testing-library/react';

const props = {
  register: vi.fn(),
  error: {
    type: 'required',
    message: 'Field is required',
  },
};

describe('FormText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input element is correctly', () => {
    render(<FormText {...props} name="location" placeholder="Test input" />);

    const location = screen.getByLabelText('location') as HTMLInputElement;
    expect(location).toBeInTheDocument();

    expect(location.placeholder).toBe('Test input');
    expect(location.value).toBe('');

    fireEvent.change(location, { target: { value: 'Input text' } });
    expect(location.value).toBe('Input text');
  });

  test('renders text area element is correctly', () => {
    render(<FormText {...props} name="description" placeholder="Test input" area={true} />);

    const description = screen.getByLabelText('description') as HTMLInputElement;
    expect(description).toBeInTheDocument();

    expect(description.placeholder).toBe('Test input');
    expect(description.value).toBe('');

    fireEvent.change(description, { target: { value: 'Input text' } });
    expect(description.value).toBe('Input text');
  });

  test('renders error message correctly', () => {
    render(<FormText {...props} name="location" />);

    const errorElement = screen.getByText('Field is required');
    expect(errorElement).toBeInTheDocument();
  });
});
