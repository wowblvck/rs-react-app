import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '../providers/Search.provider';

const RootLayout: React.FC = () => {
  return (
    <SearchProvider>
      <Header />
      <main data-testid="outlet">
        <Outlet />
      </main>
    </SearchProvider>
  );
};

export default RootLayout;
