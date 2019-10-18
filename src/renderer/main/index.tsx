import React from 'react'
import ReactDOM from 'react-dom'
import { AppStateProvider } from './providers/appState'
import { MainWindow } from './MainWindow'
import { VideoStreamProvider } from './providers/videoStream'

const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppStateProvider>
      <VideoStreamProvider>
        <Component />
      </VideoStreamProvider>
    </AppStateProvider>,
    mainElement
  )
}

render(MainWindow)
