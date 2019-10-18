import React, { useContext, useEffect, useRef } from 'react'
import { AppStateContext } from '../../providers/appState'
import { VideoStreamContext } from '../../providers/videoStream'

export const StepCalibrateWindow = () => {
  const {
    state: { windowId },
  } = useContext(AppStateContext)

  const imageRef = useRef<HTMLImageElement>(null)
  const {
    state: { isPlaying },
    actions: { play, pause, initializeStream },
  } = useContext(VideoStreamContext)

  useEffect(() => {
    if (imageRef.current) {
      initializeStream({ sourceId: windowId! }, imageRef.current)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>(setup 2/2) Calibrate Game Window</h1>
      window id: {windowId} <br />
      isPlaying: {isPlaying ? 'yes' : 'no'}
      <br />
      <br />
      <button onClick={play}>play</button>
      <button onClick={pause}>pause</button>
      <img ref={imageRef} />
    </div>
  )
}
