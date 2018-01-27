import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  SEND_VIDEO_SCREEN,
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
  ACTIONS,
  MODIFIER,
  SEND_SETTINGS,
} from '../../../_shared/constants'
import { listenTo, send } from '../../_shared/messageHelper'
import {
  Container,
  Button,
  Text,
  Content,
} from '../../_shared/components'


// TODO: Rewrite to recompose
class ContentOpened extends Component {
  constructor() {
    super()
    this.state = {
      type: null,
      isRunning: false,
      isStreaming: false,
    }
  }

  componentDidMount() {
    const image = new Image()

    listenTo(SEND_VIDEO_SCREEN, (event, args) => {
      this.startFps()
      this.logFps()
      const context = this.canvas.getContext('2d')
      image.onload = () => {
        context.drawImage(image, 0, 0, GAME_WINDOW_WIDTH * MODIFIER, GAME_WINDOW_HEIGHT * MODIFIER)
      }
      image.src = `data:image/jpeg;base64,${args.payload}`
      this.endFps()
    })
  }

  startFps() {
    this.now = Date.now() / 1000
  }

  endFps() {
    this.then = Date.now() / 1000
  }

  logFps() {
    const elapsedTime = this.now - this.then
    const fps = 1 / elapsedTime
    console.log(fps.toFixed(2))
  }

  setType = (name = '') => () => {
    const value = ACTIONS.find(item => item.name === name)
    const newState = this.state
    newState.type = value
    this.setState(newState)
    send(SEND_SETTINGS, newState)
  }

  toggleSettings = (key) => () => {
    const value = !this.state[key]
    const newState = this.state
    newState[key] = value
    this.setState(newState)
    send(SEND_SETTINGS, newState)
  }

  render() {
    const { type, isStreaming, isRunning } = this.state
    return (
      <Container>
        <Content>
          Is running: {isRunning ? 'Yes' : 'No'}
          <Button onClick={this.toggleSettings('isRunning')}>{isRunning ? 'Stop [COMMAND + J]' : 'Run [COMMAND + B]'}</Button>
        </Content>
        <hr />
        <Content>
          <Button onClick={this.toggleSettings('isStreaming')}>Toggle Streaming</Button>
        </Content>
        <hr />
        <Content>
          <Text>{type ? `Current action: ${type.label}` : 'Current action: Bot is idle.'}</Text>
          {ACTIONS.map((item) => <Button onClick={this.setType(item.name)}>{item.label}</Button>)}
          <Button onClick={this.setType()}>None</Button>
        </Content>
        {isStreaming && (
          <canvas
            ref={canvas => {
              this.canvas = canvas
            }}
            width={GAME_WINDOW_WIDTH * MODIFIER}
            height={GAME_WINDOW_HEIGHT * MODIFIER}
          />
        )}
        {!isStreaming && (
          <Content><Text> Streaming is off this might improve performance.</Text></Content>
        )}
      </Container>
    )
  }
}

ContentOpened.propTypes = {
  handleOpenGameWindow: PropTypes.func,
  handleCloseGameWindow: PropTypes.func,
  isGameWindowOpen: PropTypes.bool,
  setOpenGameWindow: PropTypes.func,
}

export default ContentOpened
