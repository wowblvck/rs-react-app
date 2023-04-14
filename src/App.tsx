import React, { createRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/app.scss';

import RootLayout from './layouts/RootLayout';

import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import PostPage from './pages/PostPage/PostPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { RoutesProp } from './types';

export const bgGallery = Object.values(
  import.meta.glob('./assets/img/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', {
    eager: true,
    as: 'url',
  })
);

export const routes: RoutesProp[] = [
  { path: '/', name: 'Home', element: <HomePage />, nodeRef: createRef(), nav: true },
  { path: '/about', name: 'About Us', element: <AboutPage />, nodeRef: createRef(), nav: true },
  { path: '/post', name: 'Post', element: <PostPage />, nodeRef: createRef() },
  { path: '*', name: '404', element: <ErrorPage />, nodeRef: createRef() },
];

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: routes.map((route) => ({
        index: route.path === '/',
        path: route.path,
        element: route.element,
      })),
    },
  ],
  {
    basename: '/',
  }
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
