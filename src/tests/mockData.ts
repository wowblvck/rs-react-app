import { CountriesInfo, PlacesInfo } from '../interfaces';

const mockPlaces: PlacesInfo[] = [
  {
    id: 6,
    country: 'Thailand',
    location: 'The Grand Palace',
    category: 'Architecture',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-W1e7iyUkteKjzl4yqSdPRmzyqRceWg7QmNKJ3HyXAwR-CnM1fVlr1T5T08Yf5waJDoUNbhZTKjJlvpSad4EsnA',
    description: 'Opulent former royal residence & museum',
    date: '2016-05-18',
    author: {
      id: 58,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/64.jpg',
      first_name: 'Katelyn',
      last_name: 'Rodriguez',
    },
  },
  {
    id: 2,
    country: 'Turkey',
    category: 'Architecture',
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
    category: 'Architecture',
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

const mockCountries: CountriesInfo[] = [
  {
    name: 'Ascension Island',
    code: 'AC',
    emoji: '🇦🇨',
    unicode: 'U+1F1E6 U+1F1E8',
    image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg',
  },
  {
    name: 'Andorra',
    code: 'AD',
    emoji: '🇦🇩',
    unicode: 'U+1F1E6 U+1F1E9',
    image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg',
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    emoji: '🇦🇪',
    unicode: 'U+1F1E6 U+1F1EA',
    image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg',
  },
  {
    name: 'Turkey',
    code: 'TR',
    emoji: '🇹🇷',
    unicode: 'U+1F1F9 U+1F1F7',
    image: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg',
  },
];

export { mockCountries, mockPlaces };
