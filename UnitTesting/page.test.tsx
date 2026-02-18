import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a log in', () => {
    render(<Page />);
 
    const text = screen.getByText('Log in')
 
    expect(text).toBeInTheDocument()
  })
})