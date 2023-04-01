import { RoutesProp } from '../types/';

const routes: RoutesProp[] = [
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

export default routes;
