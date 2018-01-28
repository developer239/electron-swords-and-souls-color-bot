import React, { Component } from 'react'
import {
  IPC_SEND_VIDEO_SCREEN,
  ACTIONS,
  IPC_SEND_SETTINGS,
  IPC_SEND_IS_RUNNING,
  GAME_WINDOW_DISPLAY_WIDTH,
  GAME_WINDOW_DISPLAY_HEIGHT,
} from '../../_shared/constants'
import { send, listenTo } from '../_shared/helpers/message'
import {
  Button,
  Pane,
  PaneGroup,
  PaneSidebar,
  PaneSidebarGroup,
  StatusText,
  Window,
  WindowContent,
} from '../_shared/components/index'


class Main extends Component {
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

    listenTo(IPC_SEND_VIDEO_SCREEN, (event, args) => {
      if (this.canvas) {
        this.startFps()
        this.logFps()
        const context = this.canvas.getContext('2d')
        image.onload = () => {
          context.drawImage(image, 0, 0, GAME_WINDOW_DISPLAY_WIDTH, GAME_WINDOW_DISPLAY_HEIGHT)
        }
        image.src = `data:image/jpeg;base64,${args.payload}`
        this.endFps()
      }
    })

    listenTo(IPC_SEND_IS_RUNNING, () => {
      this.toggleSettings('isRunning')()
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
    send(IPC_SEND_SETTINGS, newState)
  }

  toggleSettings = (key) => () => {
    const value = !this.state[key]
    const newState = this.state
    newState[key] = value
    this.setState(newState)
    send(IPC_SEND_SETTINGS, newState)
  }

  render() {
    const {
      type,
      isStreaming,
      isRunning,
    } = this.state

    return (
      <Window>
        <WindowContent>
          <PaneGroup>
            <PaneSidebar>
              <PaneSidebarGroup shouldShowDivider>
                <Button isActive={isRunning} onClick={this.toggleSettings('isRunning')}>
                  {isRunning ? 'Stop [⌘ + B]' : 'Start [⌘ + B]'}
                </Button>
                <StatusText value={isRunning ? 'ON' : 'OFF'} />
              </PaneSidebarGroup>
              <PaneSidebarGroup shouldShowDivider>
                <Button
                  isActive={isStreaming}
                  onClick={this.toggleSettings('isStreaming')}
                >{isStreaming ? 'Stop Stream' : 'Stream Video'}</Button>
                <StatusText value={isStreaming ? 'ON' : 'OFF'} />
              </PaneSidebarGroup>
              <PaneSidebarGroup>
                {ACTIONS.map((item, index) => (
                  <Button
                    key={index}
                    isActive={type && type.name === item.name}
                    onClick={this.setType(item.name)}
                  >{item.label}</Button>
                ))}
                <Button onClick={this.setType()} isActive={!type}>None</Button>
                <StatusText value={type ? type.label : 'NONE'} />
              </PaneSidebarGroup>
            </PaneSidebar>
            <Pane>
              {isStreaming && (
                <canvas
                  ref={canvas => {
                    this.canvas = canvas
                  }}
                  width={GAME_WINDOW_DISPLAY_WIDTH}
                  height={GAME_WINDOW_DISPLAY_HEIGHT}
                />
              )}
              {!isStreaming && (
                <div>Window streaming is currently turned is off. Detection performance might work better as a
                  result.</div>)}
            </Pane>
          </PaneGroup>
        </WindowContent>
      </Window>
    )
  }
}

Main.propTypes = {}

export default Main
