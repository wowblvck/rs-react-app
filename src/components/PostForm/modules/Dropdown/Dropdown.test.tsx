import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown } from '../index';
import { fireEvent } from '@testing-library/react';
import { mockCountries } from '../../../../tests/mockData';

const props = {
  register: vi.fn(),
  error: {
    type: 'required',
    message: 'Select country',
  },
};

describe('Dropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dropdown input', () => {
    render(<Dropdown {...props} name="country" items={mockCountries} />);

    const dropdown = screen.getByLabelText('country');
    expect(dropdown).toBeInTheDocument();
  });

  it('displays the correct options in the select element', () => {
    render(<Dropdown {...props} name="country" items={mockCountries} />);
    const dropdown = screen.getByLabelText('country');
    expect(dropdown).toHaveTextContent('Choose country:');
    expect(dropdown).toHaveTextContent('🇦🇨 Ascension Island');
    expect(dropdown).toHaveTextContent('🇦🇩 Andorra');
    expect(dropdown).toHaveTextContent('🇦🇪 United Arab Emirates');
  });

  it('calls the register function with the correct arguments', () => {
    render(<Dropdown {...props} items={mockCountries} name="country" />);
    const dropdown = screen.getByLabelText('country');
    fireEvent.change(dropdown, { target: { value: 'Country 1' } });
    expect(props.register).toHaveBeenCalledWith('country');
  });
});
