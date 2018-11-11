// @flow
import React from 'react'
import { render } from 'react-testing-library'
import TwitterBox from './TwitterBox'

describe('component/TwitterBox', () => {
  it('should match snapshot', () => {
    const { container } = render(<TwitterBox />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
