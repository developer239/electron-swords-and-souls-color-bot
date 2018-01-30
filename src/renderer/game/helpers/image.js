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

export const drawRectangle = (matrix, a, b, color = [0, 255, 0]) => matrix.drawRectangle(
  new cv.Point(a.x, a.y),
  new cv.Point(b.x, b.y),
  new cv.Vec(color[0], color[1], color[2]),
)

export const drawSquareAroundCenter = (region, center, r = 18, createNew = true) => {
  const x = Math.floor(center.x)
  const y = Math.floor(center.y)

  const returnedMatrix = createNew ? region.copy() : region
  const a = { x: x - r, y: y - r }
  const b = { x: x + r, y: y + r }
  return drawRectangle(returnedMatrix, a, b)
}
