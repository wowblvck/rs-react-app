import searchReducer, { setSearchValue } from '@/store/reducers/search.reducer';

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
