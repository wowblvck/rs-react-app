import { UserInfo } from './index';

export default interface PlacesInfoDto {
  country: string;
  category: string;
  location: string;
  image: string;
  description: string;
  date: string;
  author: UserInfo;
}
