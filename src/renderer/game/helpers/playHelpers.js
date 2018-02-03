import {
  MAIN_WINDOW_WIDTH,
  TOP_OFFSET,
} from '../../../_shared/constants'


export const drawRectangles = (areas, mat) => areas.forEach(area => area.rectangle.draw(mat))

export const normalizePoint = point => ({
  x: point.x + MAIN_WINDOW_WIDTH,
  y: point.y + TOP_OFFSET,
})
