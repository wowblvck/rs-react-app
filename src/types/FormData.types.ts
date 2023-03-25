import { PlacesInfo } from '../interfaces';

type ChangeFields<T, R> = Omit<T, keyof R> & R;
export type FormData = ChangeFields<
  Omit<PlacesInfo, 'id'>,
  {
    author: Omit<PlacesInfo['author'], 'id'>;
  }
>;
