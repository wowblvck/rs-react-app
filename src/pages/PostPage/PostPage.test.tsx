import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import PostPage from './PostPage';
import { mockCountries, mockPlaces } from '../../tests/mockData';
import { act } from 'react-dom/test-utils';
import PostContent from '../../components/PostContent/PostContent';

describe('PostPage', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCountries),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without errors', async () => {
    await act(() => {
      render(<PostPage />);
    });
  });

  it('should render a card items', async () => {
    render(<PostContent items={mockPlaces} />);

    const postContent = screen.getByTestId('post-content');
    expect(postContent).toBeInTheDocument();

    await waitFor(() => {
      const items = screen.queryAllByTestId('card-item');
      expect(items).toHaveLength(mockPlaces.length);
    });
  });

  it('should render a items', async () => {
    await act(() => {
      render(<PostPage />);
    });
    const location = screen.getByLabelText(/location/i);
    const description = screen.getByLabelText(/description/i);

    const locationName = 'USA';
    const descriptionInput = 'Something';

    const addButton = screen.getByRole('button', { name: /Add Post/i });

    fireEvent.change(location, { target: { value: locationName } });
    fireEvent.change(description, { target: { value: descriptionInput } });

    fireEvent.click(addButton);
  });

  it('should render if posts not created', async () => {
    render(<PostContent items={[]} />);

    await waitFor(() => {
      const items = screen.queryAllByTestId('card-item');
      expect(items).toHaveLength(0);

      if (items.length === null) {
        const postsTitle = screen.getByText('Posts not created!');
        expect(postsTitle).toBeInTheDocument();
      }
    });
  });
});
