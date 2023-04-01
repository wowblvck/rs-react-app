import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutContent from './AboutContent';

describe('AboutContent', () => {
  it('renders about content title', () => {
    render(<AboutContent />);
    const titleElement = screen.getByText(/About Us/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders about content description', () => {
    render(<AboutContent />);
    const descriptionElement = screen.getByText(
      /We will tell and show you amazing and beautiful places/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders contributors', () => {
    render(<AboutContent />);
    const contributorsElement = screen.getByText(/Contributors/i);
    expect(contributorsElement).toBeInTheDocument();
  });

  it('renders author github link', () => {
    render(<AboutContent />);
    const githubLinkElement = screen.getByRole('link', { name: /wowblvck/i });
    expect(githubLinkElement).toBeInTheDocument();
    expect(githubLinkElement).toHaveAttribute('href', 'https://github.com/wowblvck');
  });

  it('renders school link', () => {
    render(<AboutContent />);
    const schoolLinkElement = screen.getByRole('link', { name: /Rolling Scopes School/i });
    expect(schoolLinkElement).toBeInTheDocument();
    expect(schoolLinkElement).toHaveAttribute('href', 'https://rs.school/');
  });
});
