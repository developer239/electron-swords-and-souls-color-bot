import { CHARACTER_HIT_X } from './config'

export const CHARACTER_AREA: IArea = {
  topLeft: { x: 114, y: 310 },
  bottomRight: { x: 156, y: 420 },
}

export const STAR_AREA: IArea = {
  topLeft: { x: 20, y: 270 },
  bottomRight: { x: 60, y: 376 },
  key: 'left',
}

export const APPLE_AREAS: IArea[] = [
  {
    topLeft: { x: CHARACTER_HIT_X, y: 220 },
    bottomRight: { x: CHARACTER_HIT_X + 134, y: 310 },
    key: 'up',
  },
  {
    topLeft: { x: CHARACTER_HIT_X, y: 330 },
    bottomRight: { x: CHARACTER_HIT_X + 295, y: 360 },
    key: 'right',
  },
  {
    topLeft: { x: CHARACTER_HIT_X, y: 400 },
    bottomRight: { x: CHARACTER_HIT_X + 175, y: 420 },
    key: 'down',
  }
]
