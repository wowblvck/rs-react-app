import React from 'react';

type SearchState = {
  searchValue: string;
};

type SearchAction = { type: 'UPDATE_SEARCH_VALUE'; payload: string };

type SearchContextProps = {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
};

type SearchProviderProps = {
  children: React.ReactNode;
};

export { SearchState, SearchAction, SearchContextProps, SearchProviderProps };
