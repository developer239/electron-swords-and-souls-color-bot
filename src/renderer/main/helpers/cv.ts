import cv from 'opencv4nodejs'

// @ts-ignore
export const point = (coords: ICoords) => new cv.Point(coords.x, coords.y)

// @ts-ignore
export const vector = (color: IColor) => new cv.Vec(color[0], color[1], color[2])
