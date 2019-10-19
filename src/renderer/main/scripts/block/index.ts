import { Mat } from 'opencv4nodejs'
import { IAppStateContext } from '../../providers/appState/types'

export const playBlock = (appState: IAppStateContext['state']) => ({
  action: (mat: Mat) => {
    console.log('playing block')
    return mat
  },
})
