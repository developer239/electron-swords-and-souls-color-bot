import React, { useContext, useEffect, useRef } from 'react'
import { AppStateContext } from './providers/appState'
import { StepCalibrateWindow } from './components/StepCalibrateWindow'
import { StepSelectSource } from './components/StepSelectSource'
import { StepCalibrateMouse } from './components/StepCalibrateMouse'
import { VideoStreamContext } from './providers/videoStream'

export const MainWindow = () => {
  const imageRef = useRef<HTMLImageElement>(null)

  const {
    state: { windowId, isWindowCalibrated, mouseOffset },
  } = useContext(AppStateContext)
  const {
    actions: { initializeStream },
  } = useContext(VideoStreamContext)

  useEffect(() => {
    if (imageRef.current) {
      initializeStream({ sourceId: windowId! }, imageRef.current)
    }

  // eslint-disable-next-line
  }, [imageRef.current])

  const renderStep = () => {
    if (!windowId) {
      return <StepSelectSource />
    }

    if (!isWindowCalibrated) {
      return <StepCalibrateWindow />
    }

    if (!mouseOffset) {
      return <StepCalibrateMouse />
    }

    return null
  }

  return (
    <>
      {renderStep()}
      <img ref={imageRef} />
    </>
  )

}
