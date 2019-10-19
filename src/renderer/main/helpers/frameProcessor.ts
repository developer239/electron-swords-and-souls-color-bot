import cv from 'opencv4nodejs'
import { drawImage, toBlobToBuffer } from './canvas'
import { profilerEnd, profilerStart } from './profiler'
import { IScript } from '../components/Stream/types'

export const processFrame = async (
  hiddenVideo: HTMLVideoElement,
  hiddenCanvas: HTMLCanvasElement,
  displayImage: HTMLImageElement,
  script?: IScript
) => {
  drawImage(hiddenCanvas, hiddenVideo)

  profilerStart('buffer')
  const buffer = await toBlobToBuffer(hiddenCanvas)
  profilerEnd('buffer')

  if (buffer) {
    const mat = cv.imdecode(buffer)

    const base64 = cv.imencode('.jpg', mat).toString('base64')
    displayImage.src = `data:image/jpeg;base64,${base64}`

    if (script && !hiddenVideo.paused) {
      script.action(mat)
    }
  }

  if (!hiddenVideo.paused) {
    await processFrame(hiddenVideo, hiddenCanvas, displayImage, script)
  }
}
