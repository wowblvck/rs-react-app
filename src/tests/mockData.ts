import { PlacesInfo } from 'interfaces/Places.interface';

export const mockData: PlacesInfo[] = [
  {
    id: 1,
    country: 'Turkey',
    location: 'Hagia Sophia',
    image:
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSEGsnBieihtSMKyNpTeFErn1ubvvK75frVo_j0kWmttwu5JBAR6bwd3LyLukPdnVqxaGuhPRSaS1iIo5vgYWhgPA',
    description: 'Famed Byzantine mosque with a dome',
    date: '2023-03-13',
    author: {
      id: 13,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/18.jpg',
      first_name: 'Tracie',
      last_name: 'Colebrook',
    },
  },
  {
    id: 2,
    country: 'Turkey',
    location: 'The Blue Mosque',
    image:
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRIc_Uh1zFVagmGzvJ5ayZHmMjZejF9dowRQdJSk8-Ov7dZrS6YgQFXQCh74sy8xed_pXZSsNGS1tXM4zAoNOKawA',
    description: 'Iconic Blue Mosque with 6 minarets',
    date: '2022-10-11',
    author: {
      id: 25,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
      first_name: 'Buckminster',
      last_name: 'Leblanc',
    },
  },
  {
    id: 3,
    country: 'Russia',
    location: 'State Hermitage Museum',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe8X7cXH21WYx5xI8FD_7P2ZJKMH4IPe3_pVpu8yn6VPlyTSS6jKV6o7q4-W73Wd7_sOTgRTaB4EsE6svglsRZDQ',
    description: 'Art & culture museum founded in 1764',
    date: '2023-03-14',
    author: {
      id: 17,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/29.jpg',
      first_name: 'Phelan',
      last_name: 'Blackburn',
    },
  },
];
