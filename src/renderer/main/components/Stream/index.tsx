import React, { FC, useContext, useEffect, useRef } from 'react'
import { AppStateContext } from '../../providers/appState'
import { VideoStreamContext } from '../../providers/videoStream'
import { IProps } from './types'

export const Stream: FC<IProps> = ({ script }) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const {
    state: { windowId },
  } = useContext(AppStateContext)
  const {
    state: { isPlaying },
    actions: { initializeStream, play, pause, handleSetScript },
  } = useContext(VideoStreamContext)

  useEffect(() => {
    if (imageRef.current) {
      initializeStream({ sourceId: windowId! }, imageRef.current)
      handleSetScript(script)
    }

    // eslint-disable-next-line
  }, [imageRef.current])

  useEffect(() => {
    handleSetScript(script)

  // eslint-disable-next-line
  }, [script])

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
