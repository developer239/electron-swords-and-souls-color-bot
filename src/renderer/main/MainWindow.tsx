import React, { useContext } from 'react'
import { AppStateContext } from './providers/appState'
import { StepCalibrateWindow } from './components/StepCalibrateWindow'
import { StepSelectSource } from './components/StepSelectSource'

export const MainWindow = () => {
  const {
    state: { windowId },
  } = useContext(AppStateContext)

  if (!windowId) {
    return <StepSelectSource />
  }

  return <StepCalibrateWindow />
}
