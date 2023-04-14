import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PopupModal from './PopupModal';

describe('PopupModal', () => {
  test('renders correctly when visible', async () => {
    const onClose = vi.fn();
    render(<PopupModal onClose={onClose}>This is a test modal</PopupModal>);

    const modalTitle = screen.getByText(/This is a test modal/i);
    expect(modalTitle).toBeInTheDocument();
  });

  test('should call the onClose prop when clicking outside the modal', () => {
    const onCloseMock = vi.fn();
    render(<PopupModal onClose={onCloseMock}>Test message</PopupModal>);
    fireEvent.mouseDown(document);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should close the modal after 3 seconds', async () => {
    const onCloseMock = vi.fn();
    render(<PopupModal onClose={onCloseMock}>Test message</PopupModal>);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
