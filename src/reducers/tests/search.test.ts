import searchReducer, { setSearchValue } from '../search.reducer';

describe('Search reducer', () => {
  test('should set the searchValue', () => {
    const initialState = {
      searchValue: '',
    };
    const action = setSearchValue('test');
    const state = searchReducer(initialState, action);
    expect(state.searchValue).toEqual('test');
  });
});
