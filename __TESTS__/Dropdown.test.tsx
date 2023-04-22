import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown } from '../src/components/PostForm/modules';
import { fireEvent } from '@testing-library/react';

import { countries } from '../src/static/countries';

const props = {
  register: vi.fn(),
  error: {
    type: 'required',
    message: 'Select country',
  },
};

describe('Dropdown', () => {
  test('renders the dropdown input', () => {
    render(<Dropdown {...props} name="country" items={countries} />);

    const dropdown = screen.getByLabelText('country');
    expect(dropdown).toBeInTheDocument();
  });

  test('displays the correct options in the select element', () => {
    render(<Dropdown {...props} name="country" items={countries} />);
    const dropdown = screen.getByLabelText('country');
    expect(dropdown).toHaveTextContent('Choose country:');
    expect(dropdown).toHaveTextContent('🇦🇨 Ascension Island');
    expect(dropdown).toHaveTextContent('🇦🇩 Andorra');
    expect(dropdown).toHaveTextContent('🇦🇪 United Arab Emirates');
  });

  test('calls the register function with the correct arguments', () => {
    render(<Dropdown {...props} items={countries} name="country" />);
    const dropdown = screen.getByLabelText('country');
    fireEvent.change(dropdown, { target: { value: 'Country 1' } });
    expect(props.register).toHaveBeenCalledWith('country');
  });
});
