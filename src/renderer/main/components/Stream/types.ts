import { Mat } from 'opencv4nodejs'

export interface IScript {
  action: (mat: Mat, index: number) => Promise<Mat> | Mat
}

export interface IProps {
  script?: IScript
}
