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

  this.addMatchToBlackList = function addMatchToBlackList(item, size = 70, ignoreFor = 2500) {
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
    this.clearMatchBlackList()
    return this.matchBlackList.reduce((carry, blackListed) => carry
      || blackListed.rectangle.doesContain({
        x: item.x,
        y: item.y,
      }) && Date.now() - blackListed.added < blackListed.ignoreFor, false)
  }

  this.isActionBlackListed = function isActionBlackListed(item) {
    this.clearActionBlackList()
    return this.actionBlackList.reduce((carry, blackListed) => carry
      || blackListed.action.name === item.name && Date.now() - blackListed.added < blackListed.ignoreFor, false)
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
