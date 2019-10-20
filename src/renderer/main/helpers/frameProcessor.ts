import cv from 'opencv4nodejs'
import { drawImage, toBlobToBuffer } from './canvas'
import { profilerEnd, profilerStart } from './profiler'
import { IScript } from '../components/Stream/types'

export const processFrame = async (
  hiddenVideo: HTMLVideoElement,
  hiddenCanvas: HTMLCanvasElement,
  displayImage: HTMLImageElement,
  index: number,
  script?: IScript,
) => {
  // profilerEnd('buffer')
  // profilerStart('buffer')
  drawImage(hiddenCanvas, hiddenVideo)

  const buffer = await toBlobToBuffer(hiddenCanvas)

  if (buffer) {
    const mat = cv.imdecode(buffer)

    if (script) {
      const updatedMat = await script.action(mat, index)
      const base64 = cv.imencode('.jpg', updatedMat).toString('base64')
      displayImage.src = `data:image/jpeg;base64,${base64}`
    } else {
      const base64 = cv.imencode('.jpg', mat).toString('base64')
      displayImage.src = `data:image/jpeg;base64,${base64}`
    }
  }

  if (!hiddenVideo.paused) {
    await processFrame(hiddenVideo, hiddenCanvas, displayImage, index + 1, script)
  }
}
