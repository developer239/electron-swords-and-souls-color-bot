import { Mat } from 'opencv4nodejs'
// import { IAppStateContext } from '../../providers/appState/types'
// import { drawRectangle } from '../../helpers/paint'

const CHARACTER_HIT_X = 78

const lowerAppleColor = [0, 0, 120] as IColor
const upperAppleColor = [255, 50, 200] as IColor
const appleBlur = 1

const lowerStarColor = [0, 0, 0] as IColor
const upperStarColor = [255, 255, 255] as IColor
const startBlur = 1

export const playStrength = (appState: any) => ({
  action: (mat: Mat) => {
    const areas = [
      {
        coords: { x: 57 * 2, y: 140 * 2 + 30 },
        width: 21 * 2,
        height: 55 * 2,
        name: 'center',
      },
      {
        coords: { x: CHARACTER_HIT_X * 2, y: 95 * 2 + 30 },
        width: 72 * 2,
        height: 45 * 2 ,
        name: 'appleTop',
        key: 'up',
        relevantTo: 'apple',
      },
      {
        coords: { x: CHARACTER_HIT_X * 2, y: 145 * 2 + 30 },
        width: 92 * 2,
        height: 25 * 2,
        name: 'appleMid',
        key: 'right',
        relevantTo: 'apple',
      },
      {
        coords: { x: CHARACTER_HIT_X * 2, y: 175 * 2 + 30 },
        width: 92 * 2,
        height: 25 * 2,
        name: 'appleBottom',
        key: 'down',
        relevantTo: 'apple',
      },
      {
        coords: { x: 20 * 2, y: 120 * 2 + 30 },
        width: 25 * 2,
        height: 43 * 2,
        name: 'star',
        key: 'left',
        relevantTo: 'star',
      },
    ]

    // const apples = findMatchesByColor(mat, lowerAppleColor, upperAppleColor, appleBlur, 10)
    // const stars = findMatchesByColor(mat, lowerStarColor, upperStarColor, startBlur, 1)

    for (const area of areas) {
      // drawRectangle(mat, area.coords, { x: area.coords.x + area.width, y: area.coords.y + area.height })
    }

    return mat
  },
})
