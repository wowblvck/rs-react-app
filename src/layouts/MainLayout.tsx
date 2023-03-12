import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

import styles from './MainLayout.module.scss';

class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    );
  }
}

export default MainLayout;
