import robot from 'robotjs'
import { GAME_WINDOW_WIDTH } from '../../../_shared/constants'
import { getMask, getRegion } from './image'
import { drawSquareAroundCenter } from './draw'
import { colorObjectToVector } from './color'
import { findNonZeroMatches } from './search'
import { Rectangle, pointsDiff } from './geometry'
import { shuffle } from './array'


export const drawMatches = ({ type, mat, lowerColor, upperColor, blur }) => {
  const scale = 3
  const matches = []

  const targetRegion = getRegion(mat, { x: 1, y: 1 }, mat.cols - 50, mat.rows - 50)
  // There should be some more complicated logic what to detect and when to detect
  // so that the bot can do various tasks
  const rescaledMat = targetRegion.rescale(1 / scale)

  type.find.map((type) => {
    const matMasked = getMask(rescaledMat, colorObjectToVector(lowerColor[type]), colorObjectToVector(upperColor[type]), blur[type])
    const foundMatches = findNonZeroMatches(matMasked)

    foundMatches.forEach(match => {
      matches.push({
        x: match.x * scale,
        y: match.y * scale,
        type,
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
  robot.setKeyboardDelay(50)

  const wallX = 78

  const areas = [
    {
      rectangle: new Rectangle({ x: 57, y: 140 }, 21, 55),
      name: 'center',
    },
    {
      rectangle: new Rectangle({ x: wallX, y: 95 }, 72, 45),
      name: 'appleTop',
      key: 'up',
    },
    {
      rectangle: new Rectangle({ x: wallX, y: 145 }, 102, 25),
      name: 'appleMid',
      key: 'right',
    },
    {
      rectangle: new Rectangle({ x: wallX, y: 175 }, 102, 25),
      name: 'appleBottom',
      key: 'down',
    },
    {
      rectangle: new Rectangle({ x: 20, y: 120 }, 25, 43),
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

    const stars = relevant.filter(item => item.type === 'star').filter(item => item.areaName === 'star')
    const apples = relevant.filter(item => item.type === 'apple').filter(item => item.areaName === 'appleTop' || item.areaName === 'appleMid' || item.areaName === 'appleBottom')

    if (apples.length < 2 && stars.length) {
      robot.keyTap('left')
    } else if (apples.length) {
      const distances = []
      apples.forEach((apple, index) => {
        const distance = apple.x - wallX
        distances[index] = distance
      })

      if (distances.length) {
        const indexOfSmallestMatch = distances.indexOf(Math.min.apply(null, distances))
        robot.keyTap(apples[indexOfSmallestMatch].area.key)
      }
    }
  }
}

const Timer = function () {
  this.blackList = []
  this.size = 70
  this.ignoreLength = 2000

  this.addToBlackList = function (item, mat) {
    const rectangle = new Rectangle({ x: item.x - this.size / 2, y: item.y - this.size / 2 }, this.size, this.size)
    this.blackList.push({
      item,
      added: Date.now(),
      rectangle,
    })
  }

  this.isIgnored = function (item) {
    let isIgnored = false

    this.blackList.forEach(blackListed => {
      const rectangle = blackListed.rectangle
      const elapsedTime = Date.now() - blackListed.added

      if (rectangle.isIn({ x: item.x, y: item.y }) && elapsedTime < this.ignoreLength) {
        isIgnored = true
      }
    })
    return isIgnored
  }

  this.clearList = function () {
    this.blackList = this.blackList.filter(blackListed => Date.now() - blackListed.added < this.ignoreLength)
  }
}

const timer = new Timer()

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

export const playRange = ({ mat, matches }) => {
  const gameWindowX = GAME_WINDOW_WIDTH * 2
  const gameWindowY = 25

  if (matches.length) {
    const whiteListed = []
    matches.forEach(match => {
      if (!timer.isIgnored(match)) {
        whiteListed.push(match)
      }
    })

    if (whiteListed.length) {
      // const shuffled = shuffle(matches)
      const rangeTarget = whiteListed[0]
      const targetX = rangeTarget.x + gameWindowX - 5
      const targetY = rangeTarget.y + gameWindowY - 5
      robot.mouseToggle('down', 'left')
      robot.moveMouse(targetX, targetY)
      robot.mouseToggle('up', 'left')
      timer.addToBlackList(rangeTarget, mat)
      timer.clearList()
    }
  }
}
