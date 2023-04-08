import { createContext } from 'react';
import { SearchContextProps } from '../types';
import initialState from '../states/Search.state';

export const SearchContext = createContext<SearchContextProps>({
  state: initialState,
  dispatch: () => null,
});
