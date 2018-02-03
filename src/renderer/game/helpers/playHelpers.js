import {
  MAIN_WINDOW_WIDTH,
  TOP_OFFSET,
} from '../../../_shared/constants'
import { Rectangle } from './geometry'


export const drawRectangles = (areas, mat) => areas.forEach(area => area.rectangle.draw(mat))

export const normalizePoint = point => ({
  x: point.x + MAIN_WINDOW_WIDTH,
  y: point.y + TOP_OFFSET,
})

export function BlackList() {
  this.matchBlackList = []
  this.actionBlackList = []

  this.addMatchToBlackList = function addMatchToBlackList(item, size = 110, ignoreFor = 2500) {
    this.matchBlackList.push({
      item,
      added: Date.now(),
      size,
      ignoreFor,
      rectangle: new Rectangle(
        { x: item.x - size / 2, y: item.y - size / 2 },
        size, size,
      ),
    })
  }

  this.addActionToBlackList = function addActionToBlackList(action, ignoreFor = 180) {
    this.actionBlackList.push({
      action,
      added: Date.now(),
      ignoreFor,
    })
  }

  this.isMatchBlackListed = function isMatchBlackListed(item) {
    let shouldBeIgnored = false

    // TODO: Use reduce
    this.clearMatchBlackList()
    this.matchBlackList.forEach(blackListed => {
      const elapsedTime = Date.now() - blackListed.added
      if (
        blackListed.rectangle.doesContain({
          x: item.x,
          y: item.y,
        })
        && elapsedTime < blackListed.ignoreFor
      ) {
        shouldBeIgnored = true
      }
    })

    return shouldBeIgnored
  }

  this.isActionBlackListed = function isActionBlackListed(item) {
    let shouldBeIgnored = false

    // TODO: Use reduce
    this.clearActionBlackList()
    this.actionBlackList.forEach(blackListed => {
      const elapsedTime = Date.now() - blackListed.added
      if (blackListed.action.name === item.name && elapsedTime < blackListed.ignoreFor) {
        shouldBeIgnored = true
      }
    })

    return shouldBeIgnored
  }

  this.clearActionBlackList = function clearActionBlackList() {
    this.clearList('actionBlackList')
  }

  this.clearMatchBlackList = function clearMatchBlackList() {
    this.clearList('matchBlackList')
  }

  this.clearList = function clearList(listName) {
    this[listName] = this[listName].filter(blackListed => Date.now() - blackListed.added < blackListed.ignoreFor) // eslint-disable-line
  }
}
