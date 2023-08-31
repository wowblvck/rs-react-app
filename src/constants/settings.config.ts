const URL = 'https://enthusiastic-wasp-jacket.cyclic.app';

// const PROXY = 'https://important-crab-cardigan.cyclic.app';
const URL_IMAGE = `https://api.imgbb.com/1/upload`;
const API_KEY = import.meta.env.VITE_API_KEY || '0e41799ffb314b994f5584527cdedf5c';

enum URLPath {
  Places = 'places',
}
const ITEMS_PER_PAGE = 10;

export { URL, URLPath, ITEMS_PER_PAGE, URL_IMAGE, API_KEY };
