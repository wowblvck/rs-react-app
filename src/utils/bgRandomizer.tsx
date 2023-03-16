import { bgGallery } from '../App';

export const randomBg = () => {
  return bgGallery[Math.floor(Math.random() * bgGallery.length)];
};
