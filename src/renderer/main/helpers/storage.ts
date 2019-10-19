import { IAppStateContext } from '../providers/appState/types'

const APP_STATE = 'app-state'

export const saveAppState = (appState: Object) => localStorage.setItem(APP_STATE, JSON.stringify(appState))
export const clearAppState = () => localStorage.removeItem(APP_STATE)
export const loadAppState = (): IAppStateContext['state'] => {
  const appState = localStorage.getItem(APP_STATE)

  if (appState) {
    return JSON.parse(appState)
  }

  return {
    windowId: undefined,
    isWindowCalibrated: false,
    mouseOffset: undefined,
  }
}
