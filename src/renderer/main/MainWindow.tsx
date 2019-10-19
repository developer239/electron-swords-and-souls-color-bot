import React, { useState } from 'react'
import { Calibration } from './components/Calibration'
import { Stream } from './components/Stream'
import { strength } from './scripts/strength'
import { block } from './scripts/block'
import { IScript } from './components/Stream/types'

export const MainWindow = () => {
  const [script, setScript] = useState<IScript | undefined>(undefined)

  return (
    <>
      <div>
        <button onClick={() => setScript(undefined)}>reset script</button>
        <button onClick={() => setScript(strength)}>play strength</button>
        <button onClick={() => setScript(block)}>play block</button>
      </div>
      <Calibration />
      <Stream script={script} />
    </>
  )
}
