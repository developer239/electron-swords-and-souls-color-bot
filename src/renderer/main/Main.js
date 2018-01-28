import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import {
  OPEN_GAME_WINDOW,
  CLOSE_GAME_WINDOW,
} from '../../_shared/constants'
import { send, listenTo } from '../_shared/messageHelper'
import {
  Button,
  Pane,
  PaneGroup,
  PaneSidebar,
  PaneSidebarGroup,
  StatusText,
  Window,
  WindowContent,
} from './newComponents'


class Main extends Component {

  render() {
    const {
      isGameWindowOpen,
      handleOpenGameWindow,
      handleCloseGameWindow,
    } = this.props

    return (
      <Window>
        <WindowContent>
          <PaneGroup>
            <PaneSidebar>
              <PaneSidebarGroup shouldShowDivider>
                <Button>
                  Start [⌘ + B]
                </Button>
                <StatusText value="On" />
              </PaneSidebarGroup>
              <PaneSidebarGroup shouldShowDivider>
                <Button>Stream Video</Button>
                <StatusText value="On" />
              </PaneSidebarGroup>
              <PaneSidebarGroup>
                <Button>Strength</Button>
                <Button>Block</Button>
                <Button>Ranged</Button>
                <Button>None</Button>
                <StatusText value="Strength" />
              </PaneSidebarGroup>
            </PaneSidebar>
            <Pane />
          </PaneGroup>
        </WindowContent>
      </Window>
    )
  }
}

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
