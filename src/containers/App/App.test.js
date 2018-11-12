import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

describe('containers/App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />)
    expect(getByText('Twitter Box Example')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { container } = render(<App />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
