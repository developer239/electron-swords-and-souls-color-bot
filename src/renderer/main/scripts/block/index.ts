import { Mat } from 'opencv4nodejs'
import { IAppStateContext } from '../../providers/appState/types'
import { drawRectangle, drawSquareAroundCenter } from '../../helpers/paint'
import { CHARACTER_AREA } from './areas'
import { areaCenter, pointsDiff } from '../../helpers/geometry'
import { bot } from '../../helpers/bot'
import { APPLE_BLUR, CHROME_HEADER_HEIGHT, LOWER_APPLE_COLOR, UPPER_APPLE_COLOR } from '../../../config'
import { cropTargetRegion, findMatchesByColor } from '../../helpers/detection'

const WEIRD_OFFSET_DIFFERENCE = 40

export const playBlock = ({ mouseOffset }: IAppStateContext['state']) => ({
  action: (mat: Mat) => {
    const rectangleCenter = areaCenter(CHARACTER_AREA.topLeft, CHARACTER_AREA.bottomRight)

    const TOTAL_OFFSET_X = + mouseOffset!.x + WEIRD_OFFSET_DIFFERENCE
    const TOTAL_OFFSET_Y = + mouseOffset!.y + CHROME_HEADER_HEIGHT

    // character center
    const center = {
      x: rectangleCenter.x + TOTAL_OFFSET_X,
      y: rectangleCenter.y + TOTAL_OFFSET_Y,
    }

    // find apples
    const BLOCK_SCALE = 5
    const BLOCK_OFFSET_TOP_LEFT = {
      x: 250,
      y: CHROME_HEADER_HEIGHT + 160,
    }
    const BLOCK_OFFSET_BOTTOM_RIGHT = {
      width: mat.cols - 500,
      height: mat.rows - 350
    }
    const appleRegionMat = cropTargetRegion(
      mat,
      BLOCK_OFFSET_TOP_LEFT,
      BLOCK_OFFSET_BOTTOM_RIGHT.width,
      BLOCK_OFFSET_BOTTOM_RIGHT.height,
      BLOCK_SCALE,
    )
    const apples = findMatchesByColor(
      appleRegionMat,
      LOWER_APPLE_COLOR,
      UPPER_APPLE_COLOR,
      APPLE_BLUR,
      5,
    ).map((coords) => ({
      x: (coords.x * BLOCK_SCALE) + BLOCK_OFFSET_TOP_LEFT.x,
      y: (coords.y * BLOCK_SCALE) + BLOCK_OFFSET_TOP_LEFT.y,
    }))
    //
    //

    for (const apple of apples) {
      drawSquareAroundCenter(
        mat,
        apple,
        2,
      )
    }
    drawRectangle(mat, CHARACTER_AREA.topLeft, CHARACTER_AREA.bottomRight)
    drawRectangle(mat, BLOCK_OFFSET_TOP_LEFT, {
      x: BLOCK_OFFSET_TOP_LEFT.x + BLOCK_OFFSET_BOTTOM_RIGHT.width,
      y: BLOCK_OFFSET_TOP_LEFT.y + BLOCK_OFFSET_BOTTOM_RIGHT.height,
    })

    const closestApple = apples.reduce((carry, item) => {
      if (!carry) {
        return item
      }
      const itemDistance = pointsDiff(center, item)
      const carriedDistance = pointsDiff(center, carry)
      if (itemDistance > 10 && itemDistance < carriedDistance) {
        return item
      }
      return carry
    }, null as ICoords | null)

    if (closestApple) {
      const targetPoint = closestApple
      bot.moveMouse(targetPoint.x + TOTAL_OFFSET_X, targetPoint.y + TOTAL_OFFSET_Y + 15)
    }

    return mat
  },
})
