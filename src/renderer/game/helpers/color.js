import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const createVectorFromObject = object => new cv.Vec(object.b, object.g, object.r)
