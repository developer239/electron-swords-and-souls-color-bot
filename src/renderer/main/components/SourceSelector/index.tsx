import React, { FC, useEffect, useState } from 'react'
import { getSources } from '../../helpers/recorder'
import { Container, SourceContainer, Thumbnail, Title } from './styled'

interface IProps {
  onChange: (sourceId: string) => void
}

export const SourceSelector: FC<IProps> = ({ onChange }) => {
  const [sources, setSources] = useState<Electron.DesktopCapturerSource[]>([])

  const loadWindowSources = async () => {
    const windowSources = await getSources()
    setSources(windowSources)
  }

  useEffect(() => {
    loadWindowSources().catch(console.error)
  }, [])

  const handleSelectSourceId = (sourceId: string) => () => onChange(sourceId)

  return (
    <Container>
      {sources.map(source => (
        <SourceContainer
          key={source.id}
          onClick={handleSelectSourceId(source.id)}
        >
          <Title>{source.name}</Title>
          <Thumbnail src={source.thumbnail.toDataURL()} />
        </SourceContainer>
      ))}
    </Container>
  )
}
