import { Mat } from 'opencv4nodejs'
import { drawRectangle, drawSquareAroundCenter } from '../../helpers/paint'
import { SCARECROW_AREA } from './areas'
import { cropTargetRegion, findMatchesByColor } from '../../helpers/detection'
import {
  CRITICAL_BLUR,
  LOWER_CRITICAL_COLOR,
  UPPER_CRITICAL_COLOR,
} from '../../../config'
import { bot } from '../../helpers/bot'
import { blackList } from '../strength/blackList'

export const playCritical = () => ({
  action: async (mat: Mat) => {
    drawRectangle(mat, SCARECROW_AREA.topLeft, SCARECROW_AREA.bottomRight)
    const SCALE = 1
    const workMat = cropTargetRegion(
      mat,
      SCARECROW_AREA.topLeft,
      SCARECROW_AREA.bottomRight.x - SCARECROW_AREA.topLeft.x,
      SCARECROW_AREA.bottomRight.y - SCARECROW_AREA.topLeft.y,
    )
    const matches = findMatchesByColor(
      workMat,
      LOWER_CRITICAL_COLOR,
      UPPER_CRITICAL_COLOR,
      CRITICAL_BLUR,
      200,
    ).map((coords) => ({
      x: (coords.x * SCALE) + SCARECROW_AREA.topLeft.x,
      y: (coords.y * SCALE) + SCARECROW_AREA.topLeft.y,
    }))

    for (const match of matches) {
      drawSquareAroundCenter(
        mat,
        match,
        20,
      )
    }

    if (matches.length && !blackList.isKeyBlackListed('mouse-left')) {
      console.log('clicking')
      blackList.addKeyToBlackList('mouse-left', 700)
      bot.mouseClick()
    }

    return mat
  },
})
