import React, { useState, createContext, FC, useRef, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { IVideoStreamContext } from './types'
import {
  IRecordingOptions,
  initializeVideoStream,
} from '../../helpers/recorder'
import { processFrame } from '../../helpers/frameProcessor'
import { IScript } from '../../components/Stream/types'
import { listenTo } from '../../helpers/message'

export const VideoStreamContext = createContext<IVideoStreamContext>({
  state: {
    isPlaying: false,
  },
  actions: {
    initializeStream: () => null,
    play: () => null,
    pause: () => null,
    handleSetScript: () => null,
  },
})

export const VideoStreamProvider: FC = ({ children }) => {
  const [script, setScript] = useState<IScript | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const hiddenVideoRef = useRef<HTMLVideoElement>(null)
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null)
  const displayImageRef = useRef<HTMLImageElement>(null)

  const play = async () => {
    const video = hiddenVideoRef.current
    const canvas = hiddenCanvasRef.current
    const displayImage = displayImageRef.current

    if (video && canvas && displayImage) {
      await video.play()
      setIsPlaying(true)
      await processFrame(video, canvas, displayImage, 0, script)
    }
  }

  const pause = () => {
    const video = hiddenVideoRef.current

    if (video) {
      video.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    listenTo('play-pause', async () => {
      if (isPlaying) {
        pause()
      } else {
        await play()
      }
    })

    return () => {
      // @ts-ignore
      ipcRenderer.removeAllListeners()
    }

  // eslint-disable-next-line
  }, [isPlaying])

  const initializeStream = async (
    options: IRecordingOptions,
    displayImage: HTMLImageElement
  ) => {
    const stream = await initializeVideoStream(options)

    // @ts-ignore
    hiddenVideoRef.current = stream.video
    // @ts-ignore
    hiddenCanvasRef.current = stream.canvas
    // @ts-ignore
    displayImageRef.current = displayImage
  }

  const handleSetScript = (newScript?: IScript) => {
    setScript(newScript)
  }

  return (
    <VideoStreamContext.Provider
      value={{
        state: {
          isPlaying,
        },
        actions: {
          initializeStream,
          play,
          pause,
          handleSetScript,
        },
      }}
    >
      {children}
    </VideoStreamContext.Provider>
  )
}
