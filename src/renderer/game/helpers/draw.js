import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

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
