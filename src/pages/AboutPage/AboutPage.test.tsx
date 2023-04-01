import React from 'react';
import { render } from '@testing-library/react';
import { AboutPage } from '../index';

describe('AboutPage', () => {
  it('should render the AboutContent component', () => {
    const { getByTestId } = render(<AboutPage />);
    const aboutContent = getByTestId('about-content');
    expect(aboutContent).toBeInTheDocument();
  });
});
