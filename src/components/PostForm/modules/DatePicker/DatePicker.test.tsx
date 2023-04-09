import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatePicker } from '../index';
import { fireEvent } from '@testing-library/react';

const props = {
  register: vi.fn(),
  setValue: vi.fn(),
  error: {
    type: 'required',
    message: 'This field is required',
  },
  reset: false,
  onClear: vi.fn(),
};

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title and date picker inputs', () => {
    render(
      <DatePicker {...props} name="date">
        Test Date
      </DatePicker>
    );

    expect(screen.getByText('Test Date')).toBeInTheDocument();
    expect(screen.getByLabelText('date')).toBeInTheDocument();
  });

  it('displays the selected date in the text input', () => {
    render(
      <DatePicker {...props} name="date">
        Test Date
      </DatePicker>
    );

    const dateInput = screen.getByLabelText('date') as HTMLInputElement;
    const selectedDate = '2023-03-31';

    fireEvent.change(dateInput, { target: { value: selectedDate } });
    expect(dateInput.value).toBe('2023-03-31');
  });

  it('displays an error message if there is an error', () => {
    render(
      <DatePicker {...props} name="date">
        Test Date
      </DatePicker>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('reset date value', () => {
    render(
      <DatePicker {...props} name="date" reset={true}>
        Test Date
      </DatePicker>
    );

    const dateInput = screen.getByLabelText('date') as HTMLInputElement;
    const selectedDate = '';

    fireEvent.change(dateInput, { target: { value: selectedDate } });
    expect(dateInput.value).toBe(selectedDate);
  });
});