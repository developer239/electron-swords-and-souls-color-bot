import toBuffer from 'blob-to-buffer'
import { GAME_WINDOW } from '../../config'

export const drawImage = (canvas: HTMLCanvasElement, video: HTMLVideoElement) =>
  canvas.getContext('2d')!.drawImage(
    video,
    0,
    0,
    GAME_WINDOW.width,
    GAME_WINDOW.height,
  )

export const toBlobToBuffer = (canvas: HTMLCanvasElement) =>
  new Promise<Buffer | null>((resolve, reject) => {
    canvas.toBlob(blob => {
      toBuffer(blob, async (error: Error, buffer: Buffer) => {
        if (error) {
          reject(error)
        }

        resolve(buffer)
      })
    })
  })

