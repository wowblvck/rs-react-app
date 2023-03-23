import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/app.scss';

import RootLayout from './layouts/RootLayout';

import { HomePage, ErrorPage, AboutPage, PostPage } from './pages/index';

export const bgGallery = Object.values(
  import.meta.glob('./assets/img/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', {
    eager: true,
    as: 'url',
  })
);

export const routesArray = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        name: 'Home',
      },
      {
        path: 'about',
        element: <AboutPage />,
        name: 'About',
      },
      {
        path: 'post',
        element: <PostPage />,
        name: 'Post',
      },
      {
        path: '*',
        element: <ErrorPage />,
        name: '404',
      },
    ],
  },
];

export const router = createBrowserRouter(routesArray, {
  basename: '/',
});

class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
