import * as toolkitRaw from '@reduxjs/toolkit';
type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { configureStore, combineReducers } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import placesApi from '@/thunks/places.thunk';
import search from '@/store/reducers/search.reducer';
import formPlaces from '@/store/reducers/formPlaces.reducer';

const rootReducer = combineReducers({
  search,
  formPlaces,
  [placesApi.reducerPath]: placesApi.reducer,
});

export default function configureAppStore(preloadedState?: object) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
      }).concat(placesApi.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof configureAppStore>;
export type AppDispatch = ReturnType<typeof configureAppStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
