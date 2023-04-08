import { SearchState, SearchAction } from '../types';

const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    default:
      throw new Error(`Unhandled action type`);
  }
};

export default searchReducer;
