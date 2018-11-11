// @flow
import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import TwitterBox from './TwitterBox'

describe('component/TwitterBox', () => {
  const profile = {
    name: 'Misael Taveras',
    handler: '@taverasmisael',
    url: 'https://twitter.com/taverasmisael',
    picture:
      'https://pbs.twimg.com/profile_images/926912434610114560/MAMgQ07A_bigger.jpg',
  }

  describe('core and non-open state', () => {
    it('should match snapshot', () => {
      const { container } = render(<TwitterBox />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should only display profile image and input when closed', () => {
      const { getByAltText, getByLabelText } = render(<TwitterBox />)
      expect(getByAltText('Profile')).toBeInTheDocument()
      expect(getByLabelText('Write your tweet message')).toBeInTheDocument()
    })

    it('should render the right profile image', () => {
      const { getByAltText } = render(<TwitterBox profile={profile} />)
      expect(getByAltText('Profile').src).toBe(profile.picture)
    })

    it('should expand to a full version when the input has focus', () => {
      const { getByLabelText } = render(<TwitterBox />)
      const twitterBox = getByLabelText('Write your tweet message')
      fireEvent.focus(twitterBox)
    })
  })
})
