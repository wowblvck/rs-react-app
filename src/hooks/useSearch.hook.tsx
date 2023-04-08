import React from 'react';
import { SearchContext } from '../contexts/Search.context';

export const useSearch = () => React.useContext(SearchContext);
