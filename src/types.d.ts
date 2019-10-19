declare module 'blob-to-buffer'

interface ICoords {
  x: number
  y: number
}


type IColor = [number, number, number]

interface IArea {
  topLeft: ICoords
  bottomRight: ICoords
  key?: string
}

interface IMatch extends ICoords {
  area: IArea
}
