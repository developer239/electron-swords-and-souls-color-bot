import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const getMask = (matrix, colorLower, colorUpper, blur) => {
  const rangeMask = matrix.inRange(colorLower, colorUpper)

  const blurred = rangeMask.blur(new cv.Size(blur, blur))
  return blurred.threshold(
    200,
    255,
    cv.THRESH_BINARY,
  )
}

export const getRegion = (
  matrix,
  coordinates,
  width = 100,
  height = 100,
) => {
  const matchRect = new cv.Rect(
    coordinates.x,
    coordinates.y,
    width,
    height,
  )
  return matrix.getRegion(matchRect)
}
