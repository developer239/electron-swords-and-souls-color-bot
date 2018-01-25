import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const drawSquareAroundCenter = (region, center, r = 18, createNew = true) => {
  const x = Math.floor(center.x)
  const y = Math.floor(center.y)

  const returnedMatrix = createNew ? region.copy() : region
  return returnedMatrix.drawRectangle(
    new cv.Point(x - r, y - r),
    new cv.Point(x + r, y + r),
    new cv.Vec(0, 255, 0),
  )
}
