import { remote } from 'electron'
import { createVectorFromObject } from './color'


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

export const findNonZeroMatches = (matrix, neighbourSize) => {
  const matches = []
  const nonZeroMatches = matrix.findNonZero()

  nonZeroMatches.forEach(nonZeroMatch => {
    let hasNoNeighbours = true

    matches.forEach(match => {
      if (
        nonZeroMatch.x - match.x - neighbourSize < 0
        && nonZeroMatch.y - match.y - neighbourSize < 0
      ) {
        hasNoNeighbours = false
      }
    })

    if (hasNoNeighbours) {
      matches.push({
        x: nonZeroMatch.x,
        y: nonZeroMatch.y,
      })
    }
  })

  return matches
}

export const drawMatches = ({ type, mat, lowerColor, upperColor, blur }) => {
  const scale = 3
  const matches = []

  const targetRegion = getRegion(mat, { x: 1, y: 1 }, mat.cols - 50, mat.rows - 50)
  const rescaledMat = targetRegion.rescale(1 / scale)

  type.find.forEach(typeToFind => {
    const matMasked = getMask(
      rescaledMat,
      createVectorFromObject(lowerColor[typeToFind]),
      createVectorFromObject(upperColor[typeToFind]),
      blur[typeToFind],
    )

    const foundMatches = findNonZeroMatches(matMasked, type.neighbourSize)

    foundMatches.forEach(match => {
      matches.push({
        x: match.x * scale,
        y: match.y * scale,
        type: typeToFind,
      })
      drawSquareAroundCenter(
        mat,
        {
          x: match.x * scale,
          y: match.y * scale,
        },
        10,
        false,
      )
    })
  })
  return matches
}
