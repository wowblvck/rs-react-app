import * as toolkitRaw from '@reduxjs/toolkit';
type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;
import { FormPlacesState } from '../../types';

const initialState: FormPlacesState = {
  items: [],
};

const formPlacesSlice = createSlice({
  name: 'formPlaces',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setItems } = formPlacesSlice.actions;
export default formPlacesSlice.reducer;
