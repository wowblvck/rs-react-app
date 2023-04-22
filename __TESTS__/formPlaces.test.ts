import formPlacesReducer, { setItems } from '../src/store/reducers/formPlaces.reducer';
import { mockData } from '../src/tests/mocks/mockData';

describe('formPlacesSlice', () => {
  test('should add an item to the list', () => {
    const initialState = {
      items: [],
    };
    const action = setItems(mockData[0]);
    const state = formPlacesReducer(initialState, action);
    expect(state.items).toEqual([mockData[0]]);
  });
});
