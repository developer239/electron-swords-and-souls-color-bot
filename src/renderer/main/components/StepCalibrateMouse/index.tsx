import React, { useContext, useEffect, useState } from 'react'
import robot from 'robotjs'
import { AppStateContext } from '../../providers/appState'

export const StepCalibrateMouse = () => {
  const [mouseOffset, setMouseOffset] = useState<ICoords>({ x: 0, y: 0 })

  const {
    actions: { confirmMouseOffset },
  } = useContext(AppStateContext)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMouseOffset(robot.getMousePos())
    }, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <h1>(setup 3/3) Calibrate Mouse</h1>
      <p>Move mouse to the top left corner of the game window. And remember coordinates</p>
      <div>
        Current mouse position: <br />
        x: {mouseOffset.x}<br />
        y: {mouseOffset.y}<br />
      </div>
      When you know coordinates fill them in the form.
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()

          // @ts-ignore
          const data = new FormData(submitEvent.target);
          confirmMouseOffset({
            x: data.get('x'),
            y: data.get('y'),
          })
        }}
      >
        <input type="number" name="x" placeholder="x" />
        <input type="number" name="y" placeholder="y" />
        <button type="submit">confirm mouse position</button>
      </form>
    </div>
  )
}
