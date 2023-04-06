import { PlacesInfo, PlacesInfoDto } from '../interfaces';
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

const addPlace = async (context: PlacesInfoDto): Promise<PlacesInfo> => {
  try {
    const response = await fetch(`${URL}/${URLPath.Places}`, {
      method: 'POST',
      body: JSON.stringify(context),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching places: ${(error as Error).message}`);
  }
};

export { getPlaces, addPlace };
