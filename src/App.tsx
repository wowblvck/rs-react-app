import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';

import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
