import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProfilePicture } from '../src/components/PostForm/modules';

const props = {
  register: vi.fn(),
  setValue: vi.fn(),
  reset: false,
  onClear: vi.fn(),
};

describe('ProfilePicture', () => {
  window.URL.createObjectURL = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders input', () => {
    render(<ProfilePicture {...props} name="author.avatar" />);
    expect(screen.getByLabelText('author.avatar')).toBeInTheDocument();
  });

  test('renders with an error message', () => {
    render(
      <ProfilePicture
        {...props}
        name="author.avatar"
        error={{ type: 'required', message: 'Upload an image' }}
      />
    );
    expect(screen.getByText('Upload an image')).toBeInTheDocument();
  });

  test('reset image', () => {
    render(<ProfilePicture {...props} name="author.avatar" reset={true} />);
    const imageInput = screen.getByLabelText('author.avatar') as HTMLInputElement;
    const imageValue = '';

    fireEvent.change(imageInput, { target: { value: imageValue } });
    expect(imageInput.value).toBe('');
  });

  test('clicks the choose image button when label is clicked', async () => {
    render(<ProfilePicture {...props} name="author.avatar" />);
    const input = screen.getByLabelText('author.avatar');
    fireEvent.click(input);
    expect(props.register).toHaveBeenCalledTimes(1);
  });

  test('should update the image', async () => {
    render(<ProfilePicture {...props} name="author.avatar" setValue={props.setValue} />);
    const input = screen.getByLabelText('author.avatar') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } });
      window.URL.createObjectURL(file);
      props.setValue('author.avatar', file, { shouldValidate: true });
      expect(props.setValue).toHaveBeenCalled();
    });
  });
});
