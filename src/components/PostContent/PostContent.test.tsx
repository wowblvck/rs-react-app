import React from 'react';
import { render, screen } from '@testing-library/react';
import PostContent from './PostContent';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('PostContent', () => {
  test('renders "Posts not created!" when there are no items', () => {
    render(
      <Provider store={store}>
        <PostContent />
      </Provider>
    );

    const title = screen.getByText('Posts not created!');
    expect(title).toBeInTheDocument();
  });
});
