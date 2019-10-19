import { Mat } from 'opencv4nodejs'

export interface IScript {
  action: (mat: Mat) => Promise<void> | void
}

export interface IProps {
  script?: IScript
}
