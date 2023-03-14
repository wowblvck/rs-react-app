import { UserInfo } from './User.interface';

export interface PlacesInfo {
  id: number;
  country: string;
  location: string;
  image: string;
  description: string;
  date: string;
  author: UserInfo;
}
