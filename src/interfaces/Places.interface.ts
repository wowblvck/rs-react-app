import { UserInfo } from './index';

export default interface PlacesInfo {
  id: number;
  country: string;
  category: string;
  location: string;
  image: string;
  description: string;
  date: string;
  author: UserInfo;
}
