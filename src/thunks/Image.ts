import { URL_IMAGE, API_KEY } from '../constants/settings.config';

const uploadImage = async (file: File) => {
  try {
    const context = new FormData();
    context.append('source', file);
    context.append('key', API_KEY);

    const response = await fetch(`${URL_IMAGE}`, {
      method: 'POST',
      body: context,
    });
    return await response.json();
  } catch (e) {
    throw new Error(`Error upload image: ${(e as Error).message}`);
  }
};

export default uploadImage;
