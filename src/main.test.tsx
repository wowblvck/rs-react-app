import { render } from '@testing-library/react';
import App from './App';
import React from 'react';
import { mockPlaces } from './tests/mockData';
import { act } from 'react-dom/test-utils';

describe('Main', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPlaces),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<App />);
    });
  });
});
