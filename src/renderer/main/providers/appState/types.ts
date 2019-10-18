export interface IAppStateContext {
  state: {
    windowId?: string
  }
  actions: {
    selectWindow: (id: string) => void
    clearSelectedWindow: VoidFunction
  }
}
