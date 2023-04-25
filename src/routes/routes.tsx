import React, { createRef } from 'react';
import { RoutesProp } from '../types';
import HomePage from '@/pages/HomePage/HomePage';
import AboutPage from '@/pages/AboutPage/AboutPage';
import PostPage from '@/pages/PostPage/PostPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

export const routes: RoutesProp[] = [
  { path: '/', name: 'Home', element: <HomePage />, nodeRef: createRef(), nav: true },
  { path: '/about', name: 'About Us', element: <AboutPage />, nodeRef: createRef(), nav: true },
  { path: '/post', name: 'Post', element: <PostPage />, nodeRef: createRef() },
  { path: '*', name: '404', element: <ErrorPage />, nodeRef: createRef() },
];
