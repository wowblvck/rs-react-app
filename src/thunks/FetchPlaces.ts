import { PlacesInfo } from '../interfaces';
const fetchPlaces = async (): Promise<PlacesInfo[]> => {
  try {
    const response = await fetch('/db.json');
    return await response.json();
  } catch (e) {
    throw new Error(`Error while loading database: ${e}`);
  }
};

export default fetchPlaces;
