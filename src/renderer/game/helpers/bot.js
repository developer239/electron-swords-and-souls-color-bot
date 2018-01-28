import robot from 'robotjs'
import { GAME_WINDOW_WIDTH } from '../../../_shared/constants'
import { getMask } from './image'
import { drawSquareAroundCenter } from './draw'
import { colorObjectToVector } from './color'
import { findNonZeroMatches } from './search'
import { Rectangle, pointsDiff } from './geometry'
import { shuffle } from './array'


export const drawMatches = ({ type, mat, lowerColor, upperColor, blur }) => {
  const scale = 3
  const matches = []

  // There should be some more complicated logic what to detect and when to detect
  // so that the bot can do various tasks
  const rescaledMat = mat.rescale(1 / scale)

  type.find.map((type) => {
    const matMasked = getMask(rescaledMat, colorObjectToVector(lowerColor[type]), colorObjectToVector(upperColor[type]), blur[type])
    const foundMatches = findNonZeroMatches(matMasked)

    foundMatches.forEach(match => {
      matches.push({
        x: match.x * scale,
        y: match.y * scale,
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

export const playAttack = ({ mat, matches }) => {
  robot.setKeyboardDelay(30)

  const areas = [
    {
      rectangle: new Rectangle({ x: 57, y: 140 }, 21, 55),
      name: 'center',
    },
    {
      rectangle: new Rectangle({ x: 78, y: 105 }, 62, 35),
      name: 'appleTop',
      key: 'up',
    },
    {
      rectangle: new Rectangle({ x: 78, y: 145 }, 72, 25),
      name: 'appleMid',
      key: 'right',
    },
    {
      rectangle: new Rectangle({ x: 78, y: 175 }, 72, 25),
      name: 'appleBottom',
      key: 'down',
    },
    {
      rectangle: new Rectangle({ x: 20, y: 130 }, 25, 43),
      name: 'star',
      key: 'left',
    },
  ]

  // Draw helper rectangles
  areas.forEach(area => area.rectangle.draw(mat))

  const relevantMatches = []
  matches.forEach(match => {
    areas.forEach(area => {
      const isIn = area.rectangle.isIn(match)
      if (isIn) {
        relevantMatches.push({
          areaName: area.name,
          ...match,
        })
      }
    })
  })

  if (relevantMatches.length) {
    const relevant = relevantMatches.map(relevant => {
      const area = areas.find(area => area.name === relevant.areaName)
      return {
        ...relevant,
        area,
      }
    })

    const stars = relevant.filter(item => item.areaName === 'star')
    const apples = relevant.filter(item => item.areaName === 'appleTop' || item.areaName === 'appleMid' || item.areaName === 'appleBottom')

    if (apples.length < 2 && stars.length) {
      robot.keyTap('left')
    } else if (apples.length) {
      const shuffledApples = shuffle(apples)
      robot.keyTap(shuffledApples[0].area.key)
    }
  }
}

export const playDefence = ({ mat, matches }) => {
  robot.setMouseDelay(1)
  const centerTopLeft = { x: 160, y: 110 }
  const centerWidth = 35
  const centerHeight = 55
  const areas = [
    {
      rectangle: new Rectangle(centerTopLeft, centerWidth, centerHeight),
      name: 'center',
    },
  ]

  const centerPoint = {
    x: centerTopLeft.x + (centerWidth / 2),
    y: centerTopLeft.y + (centerHeight / 2),
  }

  // Draw helper rectangles
  areas.forEach(area => area.rectangle.draw(mat))

  const distances = []
  matches.forEach((match, index) => {
    const distance = pointsDiff(centerPoint, match)
    if (distance > 10) {
      console.log(distance)
      distances[index] = distance
    }
  })

  const indexOfSmallestMatch = distances.indexOf(Math.min.apply(null, distances))
  const closestApple = matches[indexOfSmallestMatch]

  const gameWindowX = GAME_WINDOW_WIDTH * 2
  const gameWindowY = 25

  // robot.moveMouseSmooth(gameWindowX, gameWindowY)

  if (closestApple) {
    const targetX = closestApple.x + gameWindowX
    const targetY = closestApple.y + gameWindowY
    robot.moveMouse(targetX, targetY)
  }
}
