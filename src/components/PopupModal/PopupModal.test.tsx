import React from 'react';
import { render, screen } from '@testing-library/react';
import PopupModal from './PopupModal';

describe('PopupModal', () => {
  test('renders correctly when visible', () => {
    render(<PopupModal isVisible={true}>This is a test modal</PopupModal>);
    const modalTitle = screen.getByText(/This is a test modal/i);
    expect(modalTitle).toBeInTheDocument();
  });
});
