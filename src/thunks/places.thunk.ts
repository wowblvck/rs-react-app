import * as rtkQuery from '@reduxjs/toolkit/dist/query/index.js';
type TypeRtkQuery = typeof rtkQuery & { default?: unknown };
const { buildCreateApi, coreModule, fetchBaseQuery } = ((rtkQuery as TypeRtkQuery).default ??
  rtkQuery) as typeof rtkQuery;
import * as rtkQueryReact from '@reduxjs/toolkit/dist/query/react/index.js';
type TypeRtkQueryReact = typeof rtkQueryReact & { default?: unknown };
const { reactHooksModule } = ((rtkQueryReact as TypeRtkQueryReact).default ??
  rtkQueryReact) as typeof rtkQueryReact;
const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);
import { URL, URLPath } from '../constants/settings.config';
import { PlacesInfo, PlacesInfoDto } from '../interfaces';
import { REHYDRATE } from 'redux-persist';
import fetch from 'cross-fetch';
import '../utils/fetch';

const placesApi = createApi({
  reducerPath: 'placesApi',
  tagTypes: ['Places'],
  baseQuery: fetchBaseQuery({ baseUrl: URL, fetchFn: fetch }),
  endpoints: (builder) => ({
    getPlaces: builder.query<PlacesInfo[] | [], string>({
      query: (query) => `${URLPath.Places}${query && `?q=${query}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Places' as const, id })),
              { type: 'Places', id: 'LIST' },
            ]
          : [{ type: 'Places', id: 'LIST' }],
    }),
    getPlace: builder.query<PlacesInfo, number>({
      query: (id) => `${URLPath.Places}/${id}`,
    }),
    addPlace: builder.mutation<PlacesInfo, PlacesInfoDto>({
      query: (place) => ({
        url: URLPath.Places,
        method: 'POST',
        body: place,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Places', id: 'LIST' }],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
});

export default placesApi;

export const { useGetPlacesQuery, useGetPlaceQuery, useAddPlaceMutation } = placesApi;
