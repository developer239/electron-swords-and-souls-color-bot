import React, { useContext, useEffect, useRef } from 'react'
import { AppStateContext } from '../../providers/appState'
import { VideoStreamContext } from '../../providers/videoStream'

export const Stream = () => {
  const imageRef = useRef<HTMLImageElement>(null)

  const {
    state: { windowId },
  } = useContext(AppStateContext)
  const {
    state: { isPlaying },
    actions: { initializeStream, play, pause },
  } = useContext(VideoStreamContext)

  useEffect(() => {
    if (imageRef.current) {
      initializeStream({ sourceId: windowId! }, imageRef.current)
    }

    // eslint-disable-next-line
  }, [imageRef.current])

  return (
    <div>
      {windowId && (
        <>
          <button onClick={isPlaying ? pause : play}>
            {isPlaying ? 'pause' : 'play'}
          </button>
          <br />
        </>
      )}
      <img ref={imageRef} />
    </div>
  )
}
