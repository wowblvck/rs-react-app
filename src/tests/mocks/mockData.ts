import { PlacesInfo } from '@/interfaces';

export const mockData: PlacesInfo[] = [
  {
    id: 1,
    country: 'Turkey',
    location: 'Hagia Sophia',
    category: 'Architecture',
    image: 'http://example.com/image',
    description: 'Famed Byzantine mosque with a dome',
    date: '2023-03-13',
    author: {
      avatar: 'http://example.com/avatar',
      first_name: 'Tracie',
      last_name: 'Colebrook',
    },
  },
];
