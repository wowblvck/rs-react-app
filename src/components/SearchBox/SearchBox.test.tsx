import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import searchReducer, { setSearchValue } from '../../store/reducers/search.reducer';
import { Provider } from 'react-redux';
import SearchBox from './SearchBox';
import store from '../../store/store';

describe('SearchBox', () => {
  test('updates the search value when the form is submitted', () => {
    const initialState = {
      searchValue: '',
    };

    const searchValue = 'Turkey';
    render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    );
    const input = screen.getByLabelText('search-input');
    const form = screen.getByLabelText('search-form');

    fireEvent.change(input, { target: { value: searchValue } });
    fireEvent.submit(form);

    const action = setSearchValue(searchValue);
    const state = searchReducer(initialState, action);
    expect(state.searchValue).toEqual(searchValue);
  });
});
