import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL, URLPath } from '../constants/settings.config';
import { PlacesInfo, PlacesInfoDto } from '../interfaces';

export const placesApi = createApi({
  reducerPath: 'placesApi',
  tagTypes: ['Places'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
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
});

export const { useGetPlacesQuery, useGetPlaceQuery, useAddPlaceMutation } = placesApi;
