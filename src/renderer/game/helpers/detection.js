import { send } from '../../_shared/messageHelper'
import { SEND_VIDEO_SCREEN, TYPES } from '../../../_shared/constants'
import { getMask, getRegion } from './image'
import { colorObjectToVector } from './color'
import { findNonZeroMatches } from './search'
import { drawSquareAroundCenter } from './draw'
import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const handleFrame = ({ lowerColor, upperColor, blur }) => (mat) => {
  const cutX = 50
  const cutY = 100
  const scale = 3

  // There should be some more complicated logic what to detect and when to detect
  // so that the bot can do various tasks

  const targetMat = getRegion(mat, { x: cutX, y: cutY }, 500, 300)
  const rescaledMat = targetMat.rescale(1 / scale)

  TYPES.map((type) => {
    const matMasked = getMask(rescaledMat, colorObjectToVector(lowerColor[type]), colorObjectToVector(upperColor[type]), blur[type])
    const matches = findNonZeroMatches(matMasked)

    matches.forEach(match => {
      drawSquareAroundCenter(
        mat,
        {
          x: match.x * scale + cutX,
          y: match.y * scale + cutY,
        },
        20,
        false,
      )
    })
  })

  console.timeEnd('stream')
  console.time('stream')

  const base64 = cv.imencode('.jpg', mat).toString('base64')
  send(SEND_VIDEO_SCREEN, base64)
}
