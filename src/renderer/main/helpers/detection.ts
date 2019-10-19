import cv, { Mat } from 'opencv4nodejs'
import { getMask, getRegion } from './matrix'
import { vector } from './cv'

export const findNonZeroMatches = (matrix: Mat, neighbourSize: number) => {
  const matches = [] as ICoords[]
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


export const findMatchesByColor = (mat: Mat, lowerColor: IColor, upperColor: IColor, itemBlur: number, scale: number) => {
  const targetRegion = getRegion(mat, { x: 1, y: 60 }, mat.cols - 100, mat.rows - 100)
  const rescaledMat = targetRegion.rescale(1 / scale)

  const mask = getMask(rescaledMat, vector(lowerColor), vector(upperColor), itemBlur)
  const matches = findNonZeroMatches(mask, 5)
  cv.imshow('title', mask)
  return matches
}
