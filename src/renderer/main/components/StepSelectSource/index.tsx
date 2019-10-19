import React, { useContext } from 'react'
import { SourceSelector } from '../SourceSelector'
import { AppStateContext } from '../../providers/appState'

export const StepSelectSource = () => {
  const {
    actions: { selectWindow },
  } = useContext(AppStateContext)

  return (
    <>
      <h1>(setup 1/3) Select Game Window</h1>
      <SourceSelector onChange={selectWindow} />
    </>
  )
}
