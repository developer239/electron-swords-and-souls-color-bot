import { desktopCapturer, remote } from 'electron'
import toBuffer from 'blob-to-buffer'
import {
  GAME_WINDOW_NAME,
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
} from '../../../_shared/constants'


const cv = remote.require('opencv4nodejs')

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

export const stream = (video, canvas, processFrame, index) => {
  canvas.getContext('2d').drawImage(video, 0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT)
  canvas.toBlob(blob => {
    toBuffer(blob, (err, buffer) => {
      if (err) {
        throw Error(err)
      }
      const mat = cv.imdecode(buffer)
      index += 1
      processFrame(mat, index)
      stream(video, canvas, processFrame, index)
    })
  })
}

export const handleMediaStream = processFrame => MediaStream => {
  const video = document.createElement('video')
  const canvas = document.createElement('canvas')
  canvas.width = GAME_WINDOW_WIDTH
  canvas.height = GAME_WINDOW_HEIGHT

  video.srcObject = MediaStream
  video.onloadedmetadata = () => {
    video.play()
    stream(video, canvas, processFrame, 0)
  }
}

export const startMediaStream = processFrame => getGameWindowSource().then(source =>
  navigator.mediaDevices.getUserMedia({
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
  }).then(handleMediaStream(processFrame)))
