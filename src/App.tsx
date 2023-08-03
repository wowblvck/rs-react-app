import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
// import Header from './components/Header';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import AboutPage from './pages/AboutPage';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
