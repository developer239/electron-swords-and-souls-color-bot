import cv, { Mat, Vec3 } from 'opencv4nodejs'

export const getRegion = (
  mat: Mat,
  coordinates: ICoords,
  width = 100,
  height = 100,
) => {
  const matchRect = new cv.Rect(
    coordinates.x,
    coordinates.y,
    width,
    height,
  )
  return mat.getRegion(matchRect)
}

export const getMask = (mat: Mat, colorLower: Vec3, colorUpper: Vec3, itemBlur: number) => {
  const rangeMask = mat.inRange(colorLower, colorUpper)

  const blurred = rangeMask.blur(new cv.Size(itemBlur, itemBlur))
  return blurred.threshold(
    200,
    255,
    cv.THRESH_BINARY,
  )
}
