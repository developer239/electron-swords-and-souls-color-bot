import React, { useState } from 'react'
import { WindowSelector } from './components/WindowSelector'
import { startScreenRecording } from './helpers/capturer'

export const MainWindow = () => {
  const [source, setSource] = useState<Electron.DesktopCapturerSource | undefined>(undefined)

  return (
    <div>
      <WindowSelector
        value={source ? source.id : undefined}
        onChange={(newSource) => {
          setSource(newSource)
          startScreenRecording(newSource)
        }}
      />
      {
        source
          ? <div>Selected source: {source.name}</div>
          : <div>select window source</div>
      }
      <video />
    </div>
  )
}
