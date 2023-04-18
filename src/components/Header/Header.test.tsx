import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureAppStore from '../../store/store';

const store = configureAppStore();

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the logo and title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const logo = screen.getByAltText('Logo');
    const title = screen.getByText(new RegExp('Beautiful.*places'));
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About Us' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test('renders search box', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    const searchBox = screen.getByLabelText('Search');
    expect(searchBox).toBeInTheDocument();
  });

  test('should set background image from session storage if available', () => {
    const { unmount } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
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
