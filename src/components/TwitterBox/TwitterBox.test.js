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

  describe('functionality', () => {
    describe('check tweet length', () => {
      it('disable submit if tweet length is 0', () => {
        const { getByText } = render(<TwitterBox />)
        const submitBtn = getByText('Tweet')
        expect(submitBtn.disabled).toBe(true)
      })
      it('enables submit if tweet is less than maxLen', () => {
        const { getByLabelText, getByText } = render(<TwitterBox />)
        const tweetInput = getByLabelText('Write your tweet message')
        const submitBtn = getByText('Tweet')
        fireEvent.change(tweetInput, { target: { value: 'Hi Tweet' } })
        expect(submitBtn.disabled).toBe(false)
      })

      it('disables submit if tweet is more than maxLen', () => {
        const { getByLabelText, getByText } = render(<TwitterBox />)
        const tweetInput = getByLabelText('Write your tweet message')
        const submitBtn = getByText('Tweet')
        fireEvent.change(tweetInput, { target: { value: 'Hi Tweet' } })
        expect(submitBtn.disabled).toBe(false)
        fireEvent.change(tweetInput, {
          target: { value: 'Hi super mega long Tweet' },
        })
        expect(submitBtn.disabled).toBe(true)
      })

      it('disables submit if tweet goes back to 0 characters', () => {
        const { getByLabelText, getByText } = render(<TwitterBox />)
        const tweetInput = getByLabelText('Write your tweet message')
        const submitBtn = getByText('Tweet')
        fireEvent.change(tweetInput, { target: { value: 'Hi Tweet' } })
        expect(submitBtn.disabled).toBe(false)
        fireEvent.change(tweetInput, { target: { value: '' } })
        expect(submitBtn.disabled).toBe(true)
      })
    })

    describe('tweet length feedback', () => {
      it('tells me how many characters I got left', () => {
        const { getByLabelText, getByText } = render(<TwitterBox />)
        const tweetInput = getByLabelText('Write your tweet message')
        fireEvent.change(tweetInput, { target: { value: 'Hi Tweet' } })
        expect(getByText(/You have \d* out of \d* left/).textContent).toEqual(
          'You have 8 out of 10 left'
        )
      })

      it('tells me when I have exceded the maxLength', () => {
        const { getByLabelText, getByText } = render(<TwitterBox />)
        const tweetInput = getByLabelText('Write your tweet message')
        fireEvent.change(tweetInput, { target: { value: 'Hi super long Tweet' } })
        expect(getByText(/You have \d* characters above the limit(\d*)/).textContent).toEqual(
          'You have 9 characters above the limit(10)'
        )
      })
    })
  })
})
