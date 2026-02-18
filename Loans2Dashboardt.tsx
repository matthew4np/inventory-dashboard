import { render, screen, act } from '@testing-library/react';
import Page from './app/dashboard/loans2/page';
import '@testing-library/jest-dom';

// Mock the fetchData function to control test data
jest.mock('../app/dashboard/loans2/page', () => ({
  ...jest.requireActual('../app/dashboard/loans2/page'),
  __esModule: true,
  default: jest.requireActual('../app/dashboard/loans2/page'), // Ensure original component is used
}));

describe('Items Page', () => {
  it('should render correctly with default search parameters', async () => {
    // Mock the searchParams props as a resolved Promise (for Next.js 15+)
    const mockSearchParams = Promise.resolve({ query: undefined, page: undefined });

    await act(async () => {
      render(<Page searchParams={mockSearchParams} />);
    });

    expect(screen.getByText('Items List')).toBeInTheDocument();
    expect(screen.getByText('Current search query: None')).toBeInTheDocument();
    expect(screen.getByText('Current page: 1')).toBeInTheDocument();
  });

  it('should render correctly with specific query and page parameters', async () => {
    // Mock specific search parameters
    const mockSearchParams = Promise.resolve({ query: 'test item', page: '2' });

    await act(async () => {
      render(<Page searchParams={mockSearchParams} />);
    });

    expect(screen.getByText('Current search query: test item')).toBeInTheDocument();
    expect(screen.getByText('Current page: 2')).toBeInTheDocument();
  });

  it('should display an error for invalid page number', async () => {
    // Mock invalid search parameters
    const mockSearchParams = Promise.resolve({ page: 'invalid' });

    await act(async () => {
      render(<Page searchParams={mockSearchParams} />);
    });

    // Zod validation should catch this and the component should handle it
    expect(screen.getByText('Error: Invalid search parameters')).toBeInTheDocument();
  });
});
