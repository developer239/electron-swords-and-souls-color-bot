import { desktopCapturer } from 'electron'
import { GAME_WINDOW } from '../../config'

export interface IRecordingOptions {
  sourceId: string
}

export const getSources = () =>
  new Promise<Electron.DesktopCapturerSource[]>((resolve, reject) => {
    desktopCapturer.getSources(
      {
        types: ['window'],
      },
      (error, windowSources) => {
        if (error) {
          reject(error)
        }

        resolve(windowSources)
      }
    )
  })

export const initializeVideoStream = async ({
  sourceId,
}: IRecordingOptions) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      // @ts-ignore
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
        maxWidth: GAME_WINDOW.width,
        maxHeight: GAME_WINDOW.height,
      },
    },
  })

  const canvas = document.createElement('canvas')
  canvas.width = GAME_WINDOW.width
  canvas.height = GAME_WINDOW.height

  const video = document.createElement('video')
  video.srcObject = stream

  return {
    video,
    canvas,
  }
}
