import React from 'react';
import { act, render, screen } from '@testing-library/react';
import PostContent from './PostContent';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { setItems } from '../../store/reducers/formPlaces.reducer';
import { mockData } from '../../tests/mocks/mockData';

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

  test('renders items when posts created', () => {
    render(
      <Provider store={store}>
        <PostContent />
      </Provider>
    );

    act(() => {
      store.dispatch(setItems(mockData[0]));
    });
  });
});
