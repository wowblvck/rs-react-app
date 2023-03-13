import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

class MainLayout extends React.Component {
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

export default MainLayout;
