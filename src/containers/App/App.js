// @flow
import React from 'react'
import TwitterBox from '../../components/TwitterBox'

const profile = {
  name: 'Misael Taveras',
  handler: '@taverasmisael',
  url: 'https://twitter.com/taverasmisael',
  picture:
    'https://pbs.twimg.com/profile_images/926912434610114560/MAMgQ07A_bigger.jpg',
}

const App = () => (
  <>
    <h1>Twitter Box Example</h1>
    <TwitterBox profile={profile} />
  </>
)

export default App
