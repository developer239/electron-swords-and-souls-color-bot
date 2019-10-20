import React, { useContext, useState } from 'react'
import { Calibration } from './components/Calibration'
import { Stream } from './components/Stream'
import { playStrength } from './scripts/strength'
import { playBlock } from './scripts/block'
import { playCritical } from './scripts/crictical'
import { IScript } from './components/Stream/types'
import { AppStateContext } from './providers/appState'

export const MainWindow = () => {
  const [script, setScript] = useState<IScript | undefined>(undefined)
  const { state } = useContext(AppStateContext)

  return (
    <>
      <div>
        <button onClick={() => setScript(undefined)}>reset script</button>
        <button onClick={() => setScript(playStrength(state))}>play strength</button>
        <button onClick={() => setScript(playCritical(state))}>play critical</button>
        <button onClick={() => setScript(playBlock(state))}>play block</button>
      </div>
      <Calibration />
      <Stream script={script} />
    </>
  )
}
