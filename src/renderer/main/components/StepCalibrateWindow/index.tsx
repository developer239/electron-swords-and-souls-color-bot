import React, { useContext } from 'react'
import { AppStateContext } from '../../providers/appState'

export const StepCalibrateWindow = () => {
  const {
    actions: { confirmWindowCalibration },
  } = useContext(AppStateContext)

  return (
    <div>
      <h1>(setup 2/3) Calibrate Game Window</h1>
      <p>Make sure that only game window is visible.</p>
      <button onClick={confirmWindowCalibration}>confirm</button>
    </div>
  )
}
