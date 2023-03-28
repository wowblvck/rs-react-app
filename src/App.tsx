import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './scss/app.scss';

import RootLayout from './layouts/RootLayout';

import { HomePage, ErrorPage, AboutPage, PostPage } from './pages';
import { RoutesProp } from './types/Routes.types';

export const bgGallery = Object.values(
  import.meta.glob('./assets/img/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', {
    eager: true,
    as: 'url',
  })
);

export const routes: RoutesProp[] = [
  {
    key: 'home',
    path: '/',
    title: 'Home',
    inNav: true,
  },
  {
    key: 'about',
    path: '/about',
    title: 'About Us',
    inNav: true,
  },
  {
    key: 'post',
    path: '/post',
    title: 'Post',
  },
  {
    key: '404',
    path: '*',
    title: '404',
  },
];

const router = createBrowserRouter(
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
