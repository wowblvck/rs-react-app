import { UserInfo } from './index';

export interface PlacesInfo {
  id: number;
  country: string;
  category: string;
  location: string;
  image: string;
  description: string;
  date: string;
  author: UserInfo;
}

export interface PlacesInfoDto {
  country: string;
  category: string;
  location: string;
  image: string;
  description: string;
  date: string;
  author: UserInfo;
}
