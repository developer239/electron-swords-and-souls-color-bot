import cv from 'opencv4nodejs'
import { drawImage, toBlobToBuffer } from './canvas'
import { profilerEnd, profilerStart } from './profiler'

export const processFrame = async (
  hiddenVideo: HTMLVideoElement,
  hiddenCanvas: HTMLCanvasElement,
  displayImage: HTMLImageElement
) => {
  drawImage(hiddenCanvas, hiddenVideo)

  profilerStart('buffer')
  const buffer = await toBlobToBuffer(hiddenCanvas)
  profilerEnd('buffer')

  if (buffer) {
    const mat = cv.imdecode(buffer)

    const base64 = cv.imencode('.jpg', mat).toString('base64')
    displayImage.src = `data:image/jpeg;base64,${base64}`
  }

  if (!hiddenVideo.paused) {
    await processFrame(hiddenVideo, hiddenCanvas, displayImage)
  }
}
