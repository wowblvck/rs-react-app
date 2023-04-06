import { PlacesInfo } from '../interfaces';
import { URL, URLPath } from '../constants/settings.config';
const getPlaces = async (): Promise<PlacesInfo[]> => {
  try {
    const response = await fetch(`${URL}/${URLPath.Places}`);
    if (!response.ok) {
      throw new Error(`error status - ${response.status}`);
    }
    const placesInfo = await response.json();
    return placesInfo as PlacesInfo[];
  } catch (error) {
    throw new Error(`Error fetching places: ${(error as Error).message}`);
  }
};

export default getPlaces;
