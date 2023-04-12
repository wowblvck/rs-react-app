import formPlacesReducer, { setItems } from '../formPlaces.reducer';
import { mockData } from '../../../tests/mocks/mockData';

describe('formPlacesSlice', () => {
  test('should add an item to the list', () => {
    const initialState = {
      items: [],
    };
    const action = setItems(mockData);
    const state = formPlacesReducer(initialState, action);
    expect(state.items).toEqual([mockData]);
  });
});
