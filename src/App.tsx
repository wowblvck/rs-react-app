import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './scss/app.scss';

import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AboutPage from './pages/AboutPage';
import RootLayout from './layouts/RootLayout';

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
        path: '*',
        element: <ErrorPage />,
        name: '404',
      },
    ],
  },
];

export const router = createBrowserRouter(routesArray);

class App extends React.Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
