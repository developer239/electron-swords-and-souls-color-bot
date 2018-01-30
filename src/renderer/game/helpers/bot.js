import robot from 'robotjs'
import {
  MAIN_WINDOW_WIDTH,
  TOP_OFFSET,
} from '../../../_shared/constants'
import { Rectangle, pointsDiff } from './geometry'


function Timer() {
  this.blackList = []
  this.size = 70
  this.ignoreLength = 2000

  this.addToBlackList = function addToBlackList(item) {
    const rectangle = new Rectangle(
      { x: item.x - this.size / 2, y: item.y - this.size / 2 },
      this.size, this.size,
    )
    this.blackList.push({
      item,
      added: Date.now(),
      rectangle,
    })
  }

  this.isIgnored = function isIgnored(item) {
    let shouldBeIgnored = false

    this.blackList.forEach(blackListed => {
      const rectangle = blackListed.rectangle
      const elapsedTime = Date.now() - blackListed.added

      if (rectangle.doesContain({ x: item.x, y: item.y }) && elapsedTime < this.ignoreLength) {
        shouldBeIgnored = true
      }
    })
    return shouldBeIgnored
  }

  this.clearList = function clearList() {
    this.blackList =
      this.blackList.filter(blackListed => Date.now() - blackListed.added < this.ignoreLength)
  }
}

const timer = new Timer()

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
      const doesContain = area.rectangle.doesContain(match)
      if (doesContain) {
        relevantMatches.push({
          areaName: area.name,
          ...match,
        })
      }
    })
  })

  if (relevantMatches.length) {
    const relevant = relevantMatches.map(relevantMatch => {
      const area = areas.find(areToFind => areToFind.name === relevantMatch.areaName)
      return {
        ...relevantMatch,
        area,
      }
    })

    const stars =
      relevant.filter(item => item.type === 'star').filter(item => item.areaName === 'star')
    const apples = relevant.filter(item => item.type === 'apple').filter(item => item.areaName === 'appleTop' || item.areaName === 'appleMid' || item.areaName === 'appleBottom')

    if (apples.length < 2 && stars.length) {
      robot.keyTap('left')
    } else if (apples.length) {
      const distances = []
      apples.forEach((apple, index) => {
        distances[index] = apple.x - wallX
      })

      if (distances.length) {
        const indexOfSmallestMatch = distances.indexOf(Math.min.apply(null, distances))
        robot.keyTap(apples[indexOfSmallestMatch].area.key)
      }
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
      distances[index] = distance
    }
  })

  const indexOfSmallestMatch = distances.indexOf(Math.min.apply(null, distances))
  const closestApple = matches[indexOfSmallestMatch]

  const gameWindowX = MAIN_WINDOW_WIDTH
  const gameWindowY = TOP_OFFSET

  // robot.moveMouseSmooth(gameWindowX, gameWindowY)

  if (closestApple) {
    const targetX = closestApple.x + gameWindowX
    const targetY = closestApple.y + gameWindowY
    robot.moveMouse(targetX, targetY)
  }
}

export const playRange = ({ mat, matches }) => {
  const gameWindowX = MAIN_WINDOW_WIDTH
  const gameWindowY = TOP_OFFSET

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
      robot.mouseClick('left')
      timer.addToBlackList(rangeTarget, mat)
      timer.clearList()
    }
  }
}
