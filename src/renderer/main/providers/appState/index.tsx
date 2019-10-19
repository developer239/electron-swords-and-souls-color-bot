import React, { useState, createContext, FC, useEffect } from 'react'
import { IAppStateContext } from './types'
import { loadAppState, saveAppState } from '../../helpers/storage'

export const AppStateContext = createContext<IAppStateContext>({
  state: {
    windowId: undefined,
    isWindowCalibrated: false,
    mouseOffset: undefined,
  },
  actions: {
    selectWindow: () => null,
    clearSelectedWindow: () => null,
    confirmWindowCalibration: () => null,
    confirmMouseOffset: () => null,
  },
})

export const AppStateProvider: FC = ({ children }) => {
  const [windowId, setWindowId] = useState<string | undefined>(undefined)
  const [isWindowCalibrated, setIsWindowCalibrated] = useState<boolean>(false)
  const [mouseOffset, setMouseOffset] = useState<ICoords | undefined>(undefined)

  useEffect(() => {
    const appState = loadAppState()

    setWindowId(appState.windowId)
    setIsWindowCalibrated(appState.isWindowCalibrated)
    setMouseOffset(appState.mouseOffset)
  // eslint-disable-next-line
  }, [])

  const selectWindow = (id: string) => setWindowId(id)
  const clearSelectedWindow = () => setWindowId(undefined)
  const confirmWindowCalibration = () => setIsWindowCalibrated(true)
  const confirmMouseOffset = (offset: ICoords) => {
    saveAppState({
      windowId,
      isWindowCalibrated,
      mouseOffset: offset,
    })

    setMouseOffset(offset)
  }

  return (
    <AppStateContext.Provider
      value={{
        state: {
          windowId: windowId,
          isWindowCalibrated,
          mouseOffset,
        },
        actions: {
          selectWindow,
          clearSelectedWindow,
          confirmWindowCalibration,
          confirmMouseOffset,
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
