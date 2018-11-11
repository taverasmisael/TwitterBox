// @flow
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import styles from './TwitterBox.module.sass'

type Props = {
  profile: {
    name: string,
    handler: string,
    url: string,
    picture: string,
  },
}

type State = {
  isOpen: boolean,
  canTweet: boolean,
  tweetContent: string,
}

class TwitterBox extends PureComponent<Props, State> {
  static defaultProps = {
    profile: {},
  }

  state = {
    isOpen: false,
    canTweet: false,
    tweetContent: '',
  }
  maxTweetLength = 10

  render() {
    const { profile } = this.props
    const { isOpen, canTweet, tweetContent } = this.state
    return (
      <div
        className={classnames(styles.container, {
          [styles.containerIsOpen]: isOpen,
        })}
      >
        <img
          alt="Profile"
          src={profile.picture}
          className={styles.profilePic}
        />
        <textarea
          type="text"
          aria-label="Write your tweet message"
          rows="1"
          data-gramm="false"
          placeholder="What is on your mind?"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={tweetContent}
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <button
            disabled={!canTweet}
            type="button"
            className={`button is-primary is-rounded ${styles.submit}`}
          >
            Tweet
          </button>
        </div>
      </div>
    )
  }

  onFocus = () => this.setState({ isOpen: true })
  onBlur = () => this.setState({ isOpen: false })
  onChange = ({ target }) => {
    const canTweet = target.value.length <= this.maxTweetLength
    return this.setState({ tweetContent: target.value, canTweet })
  }
}

export default TwitterBox
