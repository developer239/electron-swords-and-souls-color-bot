import { drawRectangle } from './draw'


export function Rectangle({ x, y }, w, h) {
  this.x = x
  this.y = y
  this.width = w
  this.height = h

  this.doesContain = function doesContain(point) {
    if ((point.x >= this.x && point.x <= this.x + this.width) &&
      (point.y >= this.y && point.y <= this.y + this.height)) {
      return true
    }
  }

  this.draw = function draw(mat, color = [255, 0, 0]) {
    drawRectangle(
      mat,
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      color,
    )
  }
}

export function pointsDiff(firstPoint, secondPoint) {
  const a = firstPoint.x - secondPoint.x
  const b = firstPoint.y - secondPoint.y
  return Math.sqrt(a * a + b * b)
}
