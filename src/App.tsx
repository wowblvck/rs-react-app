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

export const bgGallery = Object.values(
  import.meta.glob('./assets/img/backgrounds/*.{png,jpg,jpeg,PNG,JPEG}', {
    eager: true,
    as: 'url',
  })
);

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
