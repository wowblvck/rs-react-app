import { render, screen } from '@testing-library/react';
import { CheckboxForm } from '../index';
import { FieldError } from 'react-hook-form';
import React from 'react';

describe('CheckboxForm', () => {
  const termsName = 'terms';
  const termsContent = 'I accept the terms of posting';
  const register = vi.fn();
  const error: FieldError = {
    type: 'required',
    message: 'This field is required',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the checkbox with the correct label and checkbox', () => {
    render(
      <CheckboxForm name={termsName} register={register} error={error}>
        {termsContent}
      </CheckboxForm>
    );
    expect(screen.getByText(termsContent)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
