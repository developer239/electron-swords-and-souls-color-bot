import { Mat } from 'opencv4nodejs'
import { cropTargetRegion, findMatchesByColor } from '../../helpers/detection'
import {
  LOWER_APPLE_COLOR,
  UPPER_APPLE_COLOR,
  APPLE_BLUR,
  LOWER_STAR_COLOR,
  UPPER_STAR_COLOR,
  STAR_BLUR, CHROME_HEADER_HEIGHT,
} from '../../../config'
import { drawRectangle, drawSquareAroundCenter } from '../../helpers/paint'
import { CHARACTER_HIT_X } from './config'
import { APPLE_AREAS, CHARACTER_AREA, STAR_AREA } from './areas'
import { doesAreaContain } from '../../helpers/geometry'
import { bot } from '../../helpers/bot'
import { blackList } from './blackList'

export const playStrength = () => ({
  action: (mat: Mat, index: number) => {
    if (index % 3 !== 0) {
      return mat
    }

    // detect apples
    const APPLE_SCALE = 10
    const APPLE_OFFSET = {
      x: 100,
      y: CHROME_HEADER_HEIGHT + 150,
    }
    const appleRegionMat = cropTargetRegion(
      mat,
      APPLE_OFFSET,
      mat.cols - 200,
      mat.rows - 300,
      APPLE_SCALE,
    )
    const apples = findMatchesByColor(
      appleRegionMat,
      LOWER_APPLE_COLOR,
      UPPER_APPLE_COLOR,
      APPLE_BLUR,
      5,
    ).map((coords) => ({
      x: (coords.x * APPLE_SCALE) + APPLE_OFFSET.x,
      y: (coords.y * APPLE_SCALE) + APPLE_OFFSET.y,
    }))

    // detect stars
    const STARS_SCALE = 2
    const STARS_OFFSET = {
      x: 10,
      y: CHROME_HEADER_HEIGHT + 100,
    }
    const starsRegionMat = cropTargetRegion(
      mat,
      STARS_OFFSET,
      mat.cols - 600,
      mat.rows - 260,
      STARS_SCALE,
    )
    const stars = findMatchesByColor(
      starsRegionMat,
      LOWER_STAR_COLOR,
      UPPER_STAR_COLOR,
      STAR_BLUR,
      20,
    ).map((star) => ({
      x: (star.x * STARS_SCALE) + STARS_OFFSET.x,
      y: (star.y * STARS_SCALE) + STARS_OFFSET.y,
    }))

    // draw apple matches
    for (const apple of apples) {
      drawSquareAroundCenter(
        mat,
        apple,
        2,
      )
    }

    // draw star matches
    for (const star of stars) {
      drawSquareAroundCenter(
        mat,
        star,
        2,
      )
    }


    // // draw areas
    for (const area of [CHARACTER_AREA, STAR_AREA, ...APPLE_AREAS]) {
      drawRectangle(mat, area.topLeft, area.bottomRight)
    }

    const relevantApples = apples.map(match => {
      const area = APPLE_AREAS
        .filter(appleArea => !blackList.isKeyBlackListed(appleArea.key!))
        .find((currentArea) => doesAreaContain(currentArea.topLeft, currentArea.bottomRight)(match))
      if (area) {
        return {
          area,
          ...match,
        }
      }
      return false
    }).filter(item => item) as IMatch[]

    const relevantStars = stars.map(match => {
      const area = [STAR_AREA]
        .filter(starArea => !blackList.isKeyBlackListed(starArea.key!))
        .find((currentArea) => doesAreaContain(currentArea.topLeft, currentArea.bottomRight)(match))
      if (area) {
        return {
          area,
          ...match,
        }
      }
      return false
    }).filter(item => item) as IMatch[]

    // !! Ends this tick
    if (relevantApples.length) {
      const closestApple = relevantApples.reduce((carry, item) => {
        if (!carry) {
          return item
        }

        const itemDistance = item.x - CHARACTER_HIT_X
        const carryDistance = carry.x - CHARACTER_HIT_X

        if (itemDistance < carryDistance) {
          return item
        }

        return carry
      }, null as unknown as IMatch)

      const targetKey = closestApple.area!.key!
      blackList.addKeyToBlackList(targetKey)
      bot.keyTap(targetKey)

      return mat
    }

    if (relevantStars.length) {
      const targetKey = STAR_AREA.key!
      blackList.addKeyToBlackList(targetKey, 600)
      bot.keyTap(targetKey)
    }

    return mat
  },
})
