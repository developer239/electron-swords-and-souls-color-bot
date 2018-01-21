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
import { Uint8ToBase64 } from './helpers/array'
import {
  Container,
  Content,
  Header,
  Button,
} from '../_shared/components'
import ContentOpened from './components/ContentOpened'
import ContentClosed from './components/ContentClosed'


class Main extends Component {
  // TODO: Refactor this so that it can be in recompose lifecycle
  constructor() {
    super()

    const image = new Image()

    // TODO: Make this code work
    // This is supposed to convert buffer to base64 string and draw it on canvas
    // listenTo(SEND_VIDEO_SCREEN, (event, args) => {
    //   const base64String = Uint8ToBase64(args.payload)
    //
    //   const canvas = this.canvas
    //   const context = canvas.getContext('2d')
    //
    //   image.onload = () => {
    //     context.drawImage(image, 0, 0, GAME_WINDOW_WIDTH / 2, GAME_WINDOW_HEIGHT / 2)
    //   }
    //   image.src = `data:image/png;base64,${base64String}`
    // })
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
            width={GAME_WINDOW_WIDTH / 2}
            height={GAME_WINDOW_HEIGHT / 2}
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
