import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardPopup from './CardPopup';
import { mockPlaces } from '../../tests/mockData';

describe('CardPopup', () => {
  it('should render the popup when isVisible is true', () => {
    const { getByText } = render(
      <CardPopup isVisible={true} obj={mockPlaces[0]} onClose={() => {}} />
    );
    expect(getByText(mockPlaces[0].location)).toBeInTheDocument();
  });

  it('should call onClose when the X button is clicked', () => {
    const onClose = vi.fn();
    render(<CardPopup isVisible={true} obj={mockPlaces[0]} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('button-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should toggle zoom when the image is clicked', async () => {
    render(<CardPopup isVisible={true} obj={mockPlaces[0]} onClose={() => {}} />);
    const zoomText = screen.getByText('Click to Zoom In');
    expect(zoomText).toBeInTheDocument();
    expect(screen.queryByLabelText('zoom-container')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('zoom-container'));
  });
});
