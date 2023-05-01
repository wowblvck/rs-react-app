const URL = 'https://enthusiastic-wasp-jacket.cyclic.app';

const PROXY = 'https://important-crab-cardigan.cyclic.app';
const URL_IMAGE = `${PROXY}/https://freeimage.host/api/1/upload`;
const API_KEY = import.meta.env.VITE_API_KEY || '6d207e02198a847aa98d0a2a901485a5';

enum URLPath {
  Places = 'places',
}
const ITEMS_PER_PAGE = 10;

export { URL, URLPath, ITEMS_PER_PAGE, URL_IMAGE, API_KEY };
