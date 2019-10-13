import toBuffer from 'blob-to-buffer'

// 1) Install opencv
// 2) Resolve TODO: *
// 3) Draw images to canvas
// 4) Build
// 5) Refactor

const handleError = (error: Error) => {
  console.log(error)
}

const processFrame = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
  const perfStart = performance.now()
  canvas.getContext('2d')!.drawImage(video, 0, 0, 400, 400)
  canvas.toBlob((blob) => {
    toBuffer(blob, (error: Error, buffer: Buffer) => {
      if (error) {
        console.log(error)
      }

      const perEnd = performance.now()
      const fps = 1000 / (perEnd - perfStart)

      // TODO: Make some opencv magic with buffer
      // const mat = cv.imdecode(buffer)
      // console.log('buffer', buffer)
      //const base64 = cv.imencode('.jpg', mat).toString('base64')

      console.log('fps', fps)
      // TODO: only run when video is not paused
      processFrame(video, canvas)
    })
  })
}

export const startScreenRecording = async (source: Electron.DesktopCapturerSource) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        // @ts-ignore
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id,
        },
      },
    })

    const video = document.createElement('video')
    const canvas = document.createElement('canvas')

    video.srcObject = stream

    video.onloadedmetadata = async () => {
      // TODO: !! Handle pause video
      await video.play()

      // TODO: !! somehow stop this thing when video is paused (probably video.onPause or something pass param not tu run it again)
      processFrame(video, canvas)
    }
  } catch (error) {
    handleError(error)
  }
}
