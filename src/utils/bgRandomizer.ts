import { bgGallery } from '../App';

const randomBg = () => {
  return bgGallery[Math.floor(Math.random() * bgGallery.length)];
};

export default randomBg;
