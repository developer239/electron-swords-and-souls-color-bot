import { drawRectangle } from './draw'


export function Rectangle({ x, y }, w, h) {
  this.x = x
  this.y = y
  this.width = w
  this.height = h

  this.x1 = x
  this.x2 = this.x + this.width
  this.y1 = y
  this.y2 = y + this.height

  this.isIn = function ({ x, y }) {
    const xStart = this.x1
    const yStart = this.y1
    const xEnd = this.x2
    const yEnd = this.y2

    if ((x >= xStart && x <= xEnd) &&
      (y >= yStart && y <= yEnd)) {
      return true
    }
  }

  this.draw = function (mat) {
    drawRectangle(
      mat,
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      [255, 0, 0])
  }
}
