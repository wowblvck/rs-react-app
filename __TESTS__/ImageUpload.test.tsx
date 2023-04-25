import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ImageUpload } from '@/components/PostForm/modules';

const props = {
  register: vi.fn(),
  setValue: vi.fn(),
  reset: false,
  onClear: vi.fn(),
};

describe('ImageUpload', () => {
  window.URL.createObjectURL = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders input', () => {
    render(<ImageUpload {...props} name="image" />);

    expect(screen.getByLabelText('image')).toBeInTheDocument();
  });

  test('renders with an error message', () => {
    render(
      <ImageUpload
        {...props}
        name="image"
        error={{ type: 'required', message: 'Upload an image' }}
      />
    );
    expect(screen.getByText('Upload an image')).toBeInTheDocument();
  });

  test('reset image', () => {
    render(<ImageUpload {...props} name="image" reset={true} />);
    const imageInput = screen.getByLabelText('image') as HTMLInputElement;
    const imageValue = '';

    fireEvent.change(imageInput, { target: { value: imageValue } });
    expect(imageInput.value).toBe('');
  });

  test('clicks the choose image button when label is clicked', async () => {
    render(<ImageUpload {...props} name="image" />);
    const input = screen.getByLabelText('image');
    fireEvent.click(input);
    expect(props.register).toHaveBeenCalledTimes(1);
  });

  test('should update the image', async () => {
    render(<ImageUpload {...props} name="image" setValue={props.setValue} />);
    const input = screen.getByLabelText('image') as HTMLInputElement;
    const file = new File(['test image'], 'test.png', { type: 'image/png' });

    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } });
      window.URL.createObjectURL(file);
      props.setValue('image', file, { shouldValidate: true });
      expect(props.setValue).toHaveBeenCalled();
    });
  });
});
