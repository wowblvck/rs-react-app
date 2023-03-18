import React from 'react';
import { render } from '@testing-library/react';
import AboutContent from './AboutContent';

describe('AboutContent', () => {
  it('renders about content title', () => {
    const { getByText } = render(<AboutContent />);
    const titleElement = getByText(/About Us/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders about content description', () => {
    const { getByText } = render(<AboutContent />);
    const descriptionElement = getByText(/We will tell and show you amazing and beautiful places/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders contributors', () => {
    const { getByText } = render(<AboutContent />);
    const contributorsElement = getByText(/Contributors/i);
    expect(contributorsElement).toBeInTheDocument();
  });

  it('renders author github link', () => {
    const { getByRole } = render(<AboutContent />);
    const githubLinkElement = getByRole('link', { name: /wowblvck/i });
    expect(githubLinkElement).toBeInTheDocument();
    expect(githubLinkElement).toHaveAttribute('href', 'https://github.com/wowblvck');
  });

  it('renders school link', () => {
    const { getByRole } = render(<AboutContent />);
    const schoolLinkElement = getByRole('link', { name: /Rolling Scopes School/i });
    expect(schoolLinkElement).toBeInTheDocument();
    expect(schoolLinkElement).toHaveAttribute('href', 'https://rs.school/');
  });
});
