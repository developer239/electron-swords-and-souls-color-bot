import React, { FC, useEffect, useState } from 'react'
import { desktopCapturer } from 'electron'

interface IProps {
  value?: string
  onChange: (source: Electron.DesktopCapturerSource) => void
}

export const WindowSelector: FC<IProps> = ({ onChange, value }) => {
  const [sources, setSources] = useState<Electron.DesktopCapturerSource[]>([])

  useEffect(() => {
    desktopCapturer.getSources(
      {
        types: ['window'],
      },
      (error, windowSources) => {
        if (error) {
          console.error(error)
        }

        setSources(windowSources)
      })
  })

  return (
    <select size={2} onChange={(changeEvent) => {
      const targetSource = sources.find(source => source.id === changeEvent.target.value)!
      onChange(targetSource)
    }}>
      <option selected={!value}>select source</option>
      {sources.map(source => (
        <option value={source.id} selected={value === source.id}>
          {source.name}
        </option>
      ))}
    </select>
  )
}
