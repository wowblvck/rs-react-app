import '@testing-library/jest-dom/extend-expect';

import searchReducer from '../Search.reducer';
import initialState from '../../states/Search.state';
import { SearchAction } from '../../types';

describe('searchReducer', () => {
  it('updates the search value', () => {
    const action: SearchAction = { type: 'UPDATE_SEARCH_VALUE', payload: 'test' };
    const newState = searchReducer(initialState, action);
    expect(newState).toEqual({ searchValue: 'test' });
  });

  it('throws an error for an invalid action type', () => {
    const action = { type: 'INVALID_ACTION_TYPE', payload: '' };
    expect(() => searchReducer(initialState, action as SearchAction)).toThrowError(
      'Unhandled action type'
    );
  });
});
