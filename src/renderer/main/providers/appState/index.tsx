import React, { useState, createContext, FC } from 'react'
import { IAppStateContext } from './types'

export const AppStateContext = createContext<IAppStateContext>({
  state: {
    windowId: undefined,
  },
  actions: {
    selectWindow: () => null,
    clearSelectedWindow: () => null,
  },
})

export const AppStateProvider: FC = ({ children }) => {
  const [windowId, setWindowId] = useState<string | undefined>(undefined)

  const selectWindow = (id: string) => setWindowId(id)
  const clearSelectedWindow = () => setWindowId(undefined)

  return (
    <AppStateContext.Provider
      value={{
        state: {
          windowId: windowId,
        },
        actions: {
          selectWindow,
          clearSelectedWindow,
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
