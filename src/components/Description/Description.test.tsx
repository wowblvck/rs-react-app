import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from './Description';
import randomBg from '../../utils/bgRandomizer';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('Description', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('should set image state correctly when sessionStorage has a stored image', () => {
    const mockImage = 'test-image.jpg';
    sessionStorage.setItem('bgImage', mockImage);

    render(
      <Provider store={store}>
        <Description />
      </Provider>
    );
    const description = screen.getByTestId('description');

    expect(description).toHaveStyle(`--img: url(${mockImage})`);
  });

  test('should set image state correctly when sessionStorage has no stored image', () => {
    const spy = vi.spyOn(global.Math, 'random').mockReturnValue(0.5);
    const expectedImage = randomBg();

    const { unmount } = render(
      <Provider store={store}>
        <Description />
      </Provider>
    );

    expect(sessionStorage.getItem('bgImage')).toBe(expectedImage);
    expect(screen.getByTestId('description')).toHaveStyle(`--img: url(${expectedImage})`);

    spy.mockRestore();
    unmount();
    sessionStorage.removeItem('bgImage');
  });

  test('renders description component with correct title and subtitle', () => {
    render(
      <Provider store={store}>
        <Description />
      </Provider>
    );
    const titleElement = screen.getByText('Beautiful Places');
    const subtitleElement = screen.getByText('Discover new beautiful places for you.');

    expect(titleElement).toHaveTextContent('Beautiful Places');
    expect(subtitleElement).toHaveTextContent('Discover new beautiful places for you.');
  });
});
