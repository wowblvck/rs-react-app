import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormPlacesState } from '../types';
import { PlacesInfo } from '../interfaces';

const initialState: FormPlacesState = {
  items: [],
};

const formPlacesSlice = createSlice({
  name: 'formPlaces',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PlacesInfo>) {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setItems } = formPlacesSlice.actions;
export default formPlacesSlice.reducer;
