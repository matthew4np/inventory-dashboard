import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanStatus from '../app/ui/loans2/status';

describe('Checked In and Checked Out', () => {
  it('Checked In', () => {
    render(<LoanStatus status="Checked In" />);
    const span = screen.getByText('Checked In');
    
    // Check if both base and conditional classes are present
    expect(span).toHaveClass('inline-flex items-center rounded-full px-2 py-1 text-xs');
  });
})
