import { Mat } from 'opencv4nodejs'
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

export const cropTargetRegion = (mat: Mat, offset: ICoords, width: number, height: number, scale?: number) => {
  const targetRegion = getRegion(mat, offset, width, height)

  if (scale) {
    return targetRegion.rescale(1 / scale)
  }

  return targetRegion
}

export const findMatchesByColor = (mat: Mat, lowerColor: IColor, upperColor: IColor, itemBlur: number, neighbourSize: number) => {
  const mask = getMask(mat, vector(lowerColor), vector(upperColor), itemBlur)
  return findNonZeroMatches(mask, neighbourSize)
}
