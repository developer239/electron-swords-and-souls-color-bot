import {
  MAIN_WINDOW_WIDTH,
  TOP_OFFSET,
} from '../../../_shared/constants'
import { Rectangle, pointsDiff } from './geometry'


const drawRectangles = (areas, mat) => areas.forEach(area => area.rectangle.draw(mat))

const normalizePoint = point => ({
  x: point.x + MAIN_WINDOW_WIDTH,
  y: point.y + TOP_OFFSET,
})

export const playAttack = ({ mat, matches, gameBot }) => {
  // If apples x < CHARACTER_HIT_X then character was hit
  const CHARACTER_HIT_X = 78

  const areas = [
    {
      rectangle: new Rectangle({ x: 57, y: 140 }, 21, 55),
      name: 'center',
    },
    {
      rectangle: new Rectangle({ x: CHARACTER_HIT_X, y: 95 }, 72, 45),
      name: 'appleTop',
      key: 'up',
    },
    {
      rectangle: new Rectangle({ x: CHARACTER_HIT_X, y: 145 }, 92, 25),
      name: 'appleMid',
      key: 'right',
    },
    {
      rectangle: new Rectangle({ x: CHARACTER_HIT_X, y: 175 }, 92, 25),
      name: 'appleBottom',
      key: 'down',
    },
    {
      rectangle: new Rectangle({ x: 20, y: 120 }, 25, 43),
      name: 'star',
      key: 'left',
    },
  ]

  drawRectangles(areas, mat)

  const relevantMatches = matches.forEach(match => {
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

    // TODO: Use stars
    const stars =
      relevant.filter(item => item.type === 'star').filter(item => item.areaName === 'star')
    const apples = relevant.filter(item => item.type === 'apple').filter(item => item.areaName === 'appleTop' || item.areaName === 'appleMid' || item.areaName === 'appleBottom')

    if (apples.length) {
      const distances = []
      apples.forEach((apple, index) => {
        distances[index] = apple.x - CHARACTER_HIT_X
      })

      const indexOfSmallestMatch = distances.indexOf(Math.min.apply(null, distances))
      if (!gameBot.getIsPlaying()) {
        gameBot.addKeyTap(apples[indexOfSmallestMatch].area.key)
        gameBot.addWait(100)
        gameBot.play()
      }
    } else if (stars.length) {
      if (!gameBot.getIsPlaying()) {
        gameBot.addKeyTap('left')
        gameBot.play()
      }
    }
  }
}

export const playDefence = ({ mat, matches, gameBot }) => {
  const centerTopLeft = { x: 160, y: 110 }
  const centerWidth = 35
  const centerHeight = 55
  const areas = [
    {
      rectangle: new Rectangle(centerTopLeft, centerWidth, centerHeight),
      name: 'center',
    },
  ]

  drawRectangles(areas, mat)

  const centerPoint = {
    x: centerTopLeft.x + (centerWidth / 2),
    y: centerTopLeft.y + (centerHeight / 2),
  }

  const closestApple = matches.reduce((carry, item) => {
    if (!carry) {
      return item
    }
    const itemDistance = pointsDiff(centerPoint, item)
    const carriedDistance = pointsDiff(centerPoint, carry)
    if (itemDistance > 10 && itemDistance < carriedDistance) {
      return item
    }
    return carry
  }, null)

  if (closestApple) {
    if (!gameBot.getIsPlaying()) {
      const targetPoint = normalizePoint(closestApple)
      gameBot.addMoveMouse(targetPoint)
      gameBot.play()
    }
  }
}

export const playRange = ({ matches, gameBot }) => {
  if (matches.length) {
    const match = matches[Math.floor(Math.random() * matches.length)]
    const targetPoint = normalizePoint(match)
    if (!gameBot.getIsPlaying()) {
      gameBot.addMoveMouse(targetPoint)
      gameBot.addWait(300)
      gameBot.addClickLeft()
      gameBot.addWait(2000)
      gameBot.play()
    }
  }
}
