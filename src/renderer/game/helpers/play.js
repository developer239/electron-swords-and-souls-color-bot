import { Rectangle, pointsDiff } from './geometry'
import { drawRectangles, normalizePoint, BlackList } from './playHelpers'


const blackList = new BlackList()

export const playAttack = ({ mat, matches, gameBot }) => {
  // If apples x < CHARACTER_HIT_X then character is hit by apple
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
      relevantTo: 'apple',
    },
    {
      rectangle: new Rectangle({ x: CHARACTER_HIT_X, y: 145 }, 92, 25),
      name: 'appleMid',
      key: 'right',
      relevantTo: 'apple',
    },
    {
      rectangle: new Rectangle({ x: CHARACTER_HIT_X, y: 175 }, 92, 25),
      name: 'appleBottom',
      key: 'down',
      relevantTo: 'apple',
    },
    {
      rectangle: new Rectangle({ x: 20, y: 120 }, 25, 43),
      name: 'star',
      key: 'left',
      relevantTo: 'star',
    },
  ]

  drawRectangles(areas, mat)

  const relevantMatches = matches.map(match => {
    const area = areas.find(areaToFind => areaToFind.rectangle.doesContain(match))
    if (area) {
      return {
        area,
        ...match,
      }
    }
    return false
  }).filter(item => item)

  if (relevantMatches.length && !gameBot.getIsPlaying()) {
    const stars = relevantMatches.filter(item => item.type === 'star' && item.area.relevantTo === 'star').filter(() => !blackList.isActionBlackListed({ name: 'left' }))
    const apples = relevantMatches.filter(item => (item.type === 'apple') && item.area.relevantTo === 'apple').filter(item => !blackList.isActionBlackListed({ name: item.area.key }))

    if (apples.length) {
      const closestApple = apples.reduce((carry, item) => {
        if (!carry) {
          return item
        }
        const itemDistance = item.x - CHARACTER_HIT_X
        const carryDistance = carry.x - CHARACTER_HIT_X
        if (itemDistance < carryDistance) {
          return item
        }
        return carry
      }, null)

      blackList.addActionToBlackList({ name: closestApple.area.key })
      gameBot.addKeyTap(closestApple.area.key)
      gameBot.addWait(30)
      gameBot.play()
    } else if (stars.length) {
      blackList.addActionToBlackList({ name: 'left' }, 200)
      gameBot.addKeyTap('left')
      gameBot.play()
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
  if (!gameBot.getIsPlaying()) {
    const whiteListedMatches = matches.filter(matchToFilter => !blackList.isMatchBlackListed(normalizePoint(matchToFilter)))
    if (whiteListedMatches.length) {
      const match = whiteListedMatches[Math.floor(Math.random() * whiteListedMatches.length)]
      const targetPoint = normalizePoint(match)
      blackList.addMatchToBlackList(targetPoint)
      gameBot.addMoveMouse(targetPoint)
      gameBot.addWait(300)
      gameBot.addClickLeft()
      gameBot.addWait(200)
      gameBot.addMouseToggleLeft()
      gameBot.play()
    } else {
      gameBot.addMoveMouseSmooth(normalizePoint({ x: 20, y: 200 }))
      gameBot.play()
    }
  }
}
