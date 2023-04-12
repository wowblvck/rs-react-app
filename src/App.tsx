import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './scss/app.scss';

import RootLayout from './layouts/RootLayout';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import PostPage from './pages/PostPage/PostPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

export const bgGallery = Object.values(
  import.meta.glob('./assets/img/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', {
    eager: true,
    as: 'url',
  })
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="post" element={<PostPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  ),
  {
    basename: '/',
  }
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
