// @flow
import React, { PureComponent } from 'react'
import Textarea from 'react-textarea-autosize'
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
  message: string,
}

class TwitterBox extends PureComponent<Props, State> {
  static defaultProps = {
    profile: {},
  }

  state = {
    isOpen: false,
    canTweet: false,
    tweetContent: '',
    message: '',
  }
  maxTweetLength = 10

  render() {
    const { profile } = this.props
    const { isOpen, canTweet, tweetContent, message } = this.state
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
        <Textarea
          type="text"
          aria-label="Write your tweet message"
          data-gramm="false"
          placeholder="What is on your mind?"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={tweetContent}
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <span
            className={classnames(styles.message, {
              [styles.messageError]: !canTweet,
              [styles.messageVisible]: tweetContent,
            })}
          >
            {message}
          </span>
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
  onBlur = () => this.setState(state => ({ isOpen: state.tweetContent }))
  onChange = ({ target }) => {
    const canTweet =
      target.value.length && target.value.length <= this.maxTweetLength
    const message = canTweet
      ? `You have ${target.value.length} out of ${this.maxTweetLength} left`
      : `You have ${target.value.length -
          this.maxTweetLength} characters above the limit(${
          this.maxTweetLength
        })`
    return this.setState({
      tweetContent: target.value,
      canTweet,
      message,
    })
  }
}

export default TwitterBox
