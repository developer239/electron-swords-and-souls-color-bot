export interface IAppStateContext {
  state: {
    windowId?: string
    isWindowCalibrated: boolean
    mouseOffset?: ICoords
  }
  actions: {
    selectWindow: (id: string) => void
    clearSelectedWindow: VoidFunction
    confirmWindowCalibration: VoidFunction
    confirmMouseOffset: (offset: ICoords) => void
  }
}
