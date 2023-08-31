import { URL_IMAGE, API_KEY } from '@/constants/settings.config';

const uploadImage = async (file: File) => {
  try {
    const context = new FormData();
    context.append('image', file);
    context.append('key', API_KEY);

    const response = await fetch(`${URL_IMAGE}`, {
      method: 'POST',
      body: context,
    });
    const data = await response.json();
    return data.data.url;
  } catch (e) {
    throw new Error(`Error upload image: ${(e as Error).message}`);
  }
};

export default uploadImage;
