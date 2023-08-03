import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header/Header';

export const routes = {
  home: {
    path: '/',
    name: 'Home',
    element: <HomePage />,
  },
  about: {
    path: '/about',
    name: 'About',
    element: <AboutPage />,
  },
  error: {
    path: '*',
    name: '404',
    element: <ErrorPage />,
  },
};

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Routes>
            <Route path={routes.home.path} element={routes.home.element} />
            <Route path={routes.about.path} element={routes.about.element} />
            <Route path={routes.error.path} element={routes.error.element} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
