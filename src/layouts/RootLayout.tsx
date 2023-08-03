import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

class RootLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Outlet />
        </main>
      </React.Fragment>
    );
  }
}

export default RootLayout;
