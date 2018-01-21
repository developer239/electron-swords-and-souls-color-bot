import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'
import { OPEN_GAME_WINDOW, CLOSE_GAME_WINDOW } from '../../_shared/constants'
import { send } from '../_shared/messageHelper'
import {
  Container,
  Content,
  Header,
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
  </Container>
)

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
