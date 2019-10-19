import React, { useContext } from 'react'
import { StepCalibrateWindow } from '../StepCalibrateWindow'
import { StepSelectSource } from '../StepSelectSource'
import { StepCalibrateMouse } from '../StepCalibrateMouse'
import { AppStateContext } from '../../providers/appState'

export const Calibration = () => {
  const {
    state: { windowId, isWindowCalibrated, mouseOffset },
    actions: { clear },
  } = useContext(AppStateContext)

  if (!windowId) {
    return <StepSelectSource />
  }

  if (!isWindowCalibrated) {
    return <StepCalibrateWindow />
  }

  if (!mouseOffset) {
    return <StepCalibrateMouse />
  }

  return (
    <div>
      <button onClick={clear}>reset calibration</button>
    </div>
  )
}
