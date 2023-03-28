import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <main data-testid="outlet">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
