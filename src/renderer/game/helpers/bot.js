import { getMask } from './image'
import { drawSquareAroundCenter } from './draw'
import { colorObjectToVector } from './color'
import { findNonZeroMatches } from './search'


export const drawMatches = ({ type, mat, lowerColor, upperColor, blur }) => {
  const scale = 3
  let matches = []

  // There should be some more complicated logic what to detect and when to detect
  // so that the bot can do various tasks
  const rescaledMat = mat.rescale(1 / scale)

  type.find.map((type) => {
    const matMasked = getMask(rescaledMat, colorObjectToVector(lowerColor[type]), colorObjectToVector(upperColor[type]), blur[type])
    matches = findNonZeroMatches(matMasked)

    matches.forEach(match => {
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
