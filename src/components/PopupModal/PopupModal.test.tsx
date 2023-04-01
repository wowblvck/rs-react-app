import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupModal from './PopupModal';

describe('PopupModal', () => {
  it('renders correctly when visible', () => {
    const onCloseMock = vi.fn();
    render(
      <PopupModal isVisible={true} onClose={onCloseMock}>
        This is a test modal
      </PopupModal>
    );
    const modalTitle = screen.getByText(/This is a test modal/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it('closes when clicking outside the modal', () => {
    const onCloseMock = vi.fn();
    render(
      <div>
        <div>Outside the modal</div>
        <PopupModal isVisible={true} onClose={onCloseMock}>
          This is a test modal
        </PopupModal>
      </div>
    );
    const outsideElement = screen.getByText(/Outside the modal/i);
    fireEvent.mouseDown(outsideElement);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes automatically after 3 seconds', () => {
    vi.useFakeTimers();
    const onCloseMock = vi.fn();
    render(
      <PopupModal isVisible={true} onClose={onCloseMock}>
        This is a test modal
      </PopupModal>
    );
    vi.advanceTimersByTime(3000);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
