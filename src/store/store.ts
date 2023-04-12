import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { placesApi } from '../thunks/places.thunk';
import search from '../reducers/search.reducer';
import formPlaces from '../reducers/formPlaces.reducer';

const store = configureStore({
  reducer: {
    search,
    formPlaces,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(placesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
