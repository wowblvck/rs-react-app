import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PostForm from './PostForm';
import { mockCountries } from '../../tests/mockData';
import { act } from 'react-dom/test-utils';

const categories = ['All', 'Architecture', 'Nature', 'City', 'Art'];

describe('PostForm', () => {
  const mockHandleForm = vi.fn(() => {});
  window.URL.createObjectURL = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCountries),
      } as Response)
    );
  });

  it('should render form elements', async () => {
    await act(() => {
      render(<PostForm handleForm={mockHandleForm} />);
    });

    await waitFor(() => {
      expect(screen.getByLabelText('location')).toBeInTheDocument();
      expect(screen.getByLabelText('description')).toBeInTheDocument();
      expect(screen.getAllByRole('radio')).toHaveLength(categories.length);
      expect(screen.getByLabelText('country')).toBeInTheDocument();
      expect(screen.getByLabelText('author.avatar')).toBeInTheDocument();
      expect(screen.getByLabelText('author.firstName')).toBeInTheDocument();
      expect(screen.getByLabelText('author.lastName')).toBeInTheDocument();
      expect(screen.getByLabelText('image')).toBeInTheDocument();
      expect(screen.getByLabelText('date')).toBeInTheDocument();
      expect(screen.getByLabelText('terms')).toBeInTheDocument();
      expect(screen.getByLabelText('consent')).toBeInTheDocument();
    });
  });
});
