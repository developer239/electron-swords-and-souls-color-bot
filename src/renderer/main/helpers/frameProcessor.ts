import cv from 'opencv4nodejs'
import toBuffer from 'blob-to-buffer'
import { GAME_WINDOW } from '../../config'
// import { sleep } from './sleep'

export const getContext = (canvas: HTMLCanvasElement) =>
  canvas.getContext('2d')!

// @ts-ignore
export const createPoint = (x: number, y: number) => new cv.Point(x, y)

export const createVec = (r: number, g: number, b: number) =>
  // @ts-ignore
  new cv.Vec(r, g, b)

export const processFrame = (
  hiddenVideo: HTMLVideoElement,
  hiddenCanvas: HTMLCanvasElement,
  displayImage: HTMLImageElement
) => {
  getContext(hiddenCanvas).drawImage(
    hiddenVideo,
    0,
    0,
    GAME_WINDOW.width,
    GAME_WINDOW.height
  )

  hiddenCanvas.toBlob(blob => {
    toBuffer(blob, async (error: Error, buffer: Buffer) => {
      if (error) {
        console.log(error)
      }

      const mat = cv.imdecode(buffer)
      mat.drawRectangle(
        createPoint(20, 20),
        createPoint(100, 200),
        createVec(0, 255, 0)
      )

      const base64 = cv.imencode('.jpg', mat).toString('base64')
      displayImage.src = `data:image/jpeg;base64,${base64}`

      // TODO: when sleeping it lags regularly figure out why
      // await sleep(100)

      if (!hiddenVideo.paused) {
        processFrame(hiddenVideo, hiddenCanvas, displayImage)
      }
    })
  })
}
