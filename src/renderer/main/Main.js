import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'
import {
  OPEN_GAME_WINDOW,
  CLOSE_GAME_WINDOW,
  SEND_VIDEO_SCREEN,
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
} from '../../_shared/constants'
import { send, listenTo } from '../_shared/messageHelper'
import {
  Container,
  Content,
  Header,
  Button,
} from '../_shared/components'
import ContentOpened from './components/ContentOpened'
import ContentClosed from './components/ContentClosed'


const MODIFIER = 1.5

class Main extends Component {
  constructor() {
    super()

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

  render() {
    const {
      isGameWindowOpen,
      handleOpenGameWindow,
      handleCloseGameWindow,
    } = this.props

    return (
      (
        <Container>
          <Header>I Am Bot</Header>
          <Content>
            <Button
              onClick={isGameWindowOpen
                ? handleCloseGameWindow
                : handleOpenGameWindow}
            >{isGameWindowOpen ? 'Close Game Window' : 'Open Game Window'}</Button>
            {
              isGameWindowOpen
                ? <ContentOpened />
                : <ContentClosed />
            }
          </Content>
          <canvas
            ref={canvas => {
              this.canvas = canvas
            }}
            width={GAME_WINDOW_WIDTH * MODIFIER}
            height={GAME_WINDOW_HEIGHT * MODIFIER}
          />
        </Container>
      )
    )
  }
}

Main.propTypes = {
  handleOpenGameWindow: PropTypes.func.isRequired,
  handleCloseGameWindow: PropTypes.func.isRequired,
  isGameWindowOpen: PropTypes.bool.isRequired,
}

const enhance = compose(
  withState('isGameWindowOpen', 'setOpenGameWindow', false),
  withHandlers({
    handleOpenGameWindow: ({ setOpenGameWindow }) => () => {
      setOpenGameWindow(true)
      send(OPEN_GAME_WINDOW)
    },
    handleCloseGameWindow: ({ setOpenGameWindow }) => () => {
      setOpenGameWindow(false)
      send(CLOSE_GAME_WINDOW)
    },
  }),
)

export default enhance(Main)
