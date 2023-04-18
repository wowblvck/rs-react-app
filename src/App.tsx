import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import PostPage from './pages/PostPage/PostPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="post" element={<PostPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
