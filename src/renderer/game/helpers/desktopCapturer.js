import { desktopCapturer, remote } from 'electron'
import toBuffer from 'blob-to-buffer'
import {
  GAME_WINDOW_NAME,
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
  SEND_VIDEO_SCREEN,
} from '../../../_shared/constants'
import { send } from '../../_shared/messageHelper'


const cv = remote.require('opencv4nodejs')

const FPS = 1

export const getGameWindowSource = () => new Promise(resolve => {
  desktopCapturer.getSources({ types: ['window'] }, (error, sources) => {
    if (error) {
      throw error
    }

    for (let i = 0; i < sources.length; ++i) {
      const window = sources[i]
      if (window.name === GAME_WINDOW_NAME) {
        resolve(window)
      }
    }
  })
})

export const startMediaStream = () => getGameWindowSource().then(source => navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id,
        minWidth: GAME_WINDOW_WIDTH,
        maxWidth: GAME_WINDOW_WIDTH,
        minHeight: GAME_WINDOW_HEIGHT,
        maxHeight: GAME_WINDOW_HEIGHT,
      },
    },
  }).then(handleMediaStream),
)

export const handleMediaStream = MediaStream => {
  const video = document.createElement('video')
  const canvas = document.createElement('canvas')
  canvas.width = GAME_WINDOW_WIDTH
  canvas.height = GAME_WINDOW_HEIGHT

  video.srcObject = MediaStream
  video.onloadedmetadata = () => {
    video.play()
    stream(video, canvas)
  }
}

export const stream = (video, canvas) => {
  canvas.getContext('2d').drawImage(video, 0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT)
  canvas.toBlob((blob) => {
    toBuffer(blob, (err, buffer) => {
      const mat = cv.imdecode(buffer)

      // TODO: Make this work
      // This is supposed to send the mat buffer to the main window
      // mat.getDataAsync((error, buffer) => {
      //   if (error) {
      //     throw error
      //   }
      //   // send(SEND_VIDEO_SCREEN, new Uint8Array(buffer))
      // })

      setTimeout(() => {
        stream(video, canvas)
      }, 1000 / FPS)
    })
  })
}
