import { Mat } from 'opencv4nodejs'
import { point, vector } from './cv'

export const drawRectangle = (
  matrix: Mat,
  a: ICoords,
  b: ICoords,
  color: IColor = [0, 255, 0]
) => matrix.drawRectangle(
  point(a),
  point(b),
  vector(color)
)

export const drawSquareAroundCenter = (mat: Mat, center: ICoords, r = 18) => {
  const x = Math.floor(center.x)
  const y = Math.floor(center.y)

  const a = { x: x - r, y: y - r }
  const b = { x: x + r, y: y + r }
  return drawRectangle(mat, a, b)
}
