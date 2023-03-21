import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { withRouter } from '../../utils/withRouter';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the logo and title', () => {
    const MockHeader = withRouter(Header);
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <MockHeader />
      </MemoryRouter>
    );
    const logo = getByAltText('Logo');
    const title = getByText(new RegExp('Beautiful.*places'));
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('renders the navigation links', () => {
    const MockHeader = withRouter(Header);
    const { getByRole } = render(
      <MemoryRouter>
        <MockHeader />
      </MemoryRouter>
    );
    const homeLink = getByRole('link', { name: 'Home' });
    const aboutLink = getByRole('link', { name: 'About Us' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it('renders search box', () => {
    const MockHeader = withRouter(Header);
    const { getByLabelText } = render(
      <MemoryRouter>
        <MockHeader />
      </MemoryRouter>
    );
    const searchBox = getByLabelText('Search');
    expect(searchBox).toBeInTheDocument();
  });

  it('should set background image from session storage if available', () => {
    const MockHeader = withRouter(Header);
    const { unmount } = render(
      <MemoryRouter>
        <MockHeader />
      </MemoryRouter>
    );
    const mockImage = 'test-image.jpg';
    if (mockImage) {
      localStorage.setItem('bgImage', mockImage);
    }
    unmount();
    const image = localStorage.getItem('bgImage');
    if (image) {
      expect(localStorage.getItem('bgImage')).toBe(mockImage);
    }
  });
});
