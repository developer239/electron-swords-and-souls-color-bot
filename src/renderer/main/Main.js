import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import {
  OPEN_GAME_WINDOW,
  CLOSE_GAME_WINDOW,
} from '../../_shared/constants'
import { send, listenTo } from '../_shared/messageHelper'
import {
  Container,
  Content,
  Button,
} from '../_shared/components'
import ContentOpened from './components/ContentOpened'
import ContentClosed from './components/ContentClosed'


const Main = ({
  isGameWindowOpen,
  handleOpenGameWindow,
  handleCloseGameWindow,
}) => (
  <Container>
    <Content>
      <Button
        onClick={isGameWindowOpen
          ? handleCloseGameWindow
          : handleOpenGameWindow}
      >{isGameWindowOpen ? 'Stop [Command + J]' : 'Start [Command + B]'}</Button>
      {
        isGameWindowOpen
          ? <ContentOpened />
          : <ContentClosed />
      }
    </Content>
  </Container>
)

Main.propTypes = {
  handleOpenGameWindow: PropTypes.func.isRequired,
  handleCloseGameWindow: PropTypes.func.isRequired,
  isGameWindowOpen: PropTypes.bool.isRequired,
  setOpenGameWindow: PropTypes.func.isRequired,
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
  lifecycle({
    componentDidMount() {
      listenTo(OPEN_GAME_WINDOW, () => {
        this.props.setOpenGameWindow(true)
      })

      listenTo(CLOSE_GAME_WINDOW, () => {
        this.props.setOpenGameWindow(false)
      })
    },
  }),
)

export default enhance(Main)
