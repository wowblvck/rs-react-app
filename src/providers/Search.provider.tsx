import React, { useReducer } from 'react';
import { SearchContext } from '../contexts/Search.context';
import searchReducer from '../reducers/Search.reducer';
import { SearchProviderProps } from '../types';
import initialState from '../states/Search.state';

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>;
};
