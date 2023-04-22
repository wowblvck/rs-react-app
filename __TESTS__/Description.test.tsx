import React from 'react';
import { render, screen } from '@testing-library/react';
import Description from '../src/components/Description/Description';
import { Provider } from 'react-redux';
import configureAppStore from '../src/store/store';

const store = configureAppStore();

describe('Description', () => {
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
