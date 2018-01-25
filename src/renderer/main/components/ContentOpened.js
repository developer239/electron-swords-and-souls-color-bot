import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  SEND_VIDEO_SCREEN,
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
} from '../../../_shared/constants'
import { listenTo } from '../../_shared/messageHelper'
import {
  Container,
} from '../../_shared/components'


class ContentOpened extends Component {
  componentDidMount() {
    const image = new Image()

    listenTo(SEND_VIDEO_SCREEN, (event, args) => {
      this.startFps()
      this.logFps()

      const context = this.canvas.getContext('2d')
      image.onload = () => {
        context.drawImage(image, 0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT)
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
    return (
      <Container>
        <canvas
          ref={canvas => {
            this.canvas = canvas
          }}
          width={GAME_WINDOW_WIDTH}
          height={GAME_WINDOW_HEIGHT}
        />
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
