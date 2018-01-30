import React from 'react'
import PropTypes from 'prop-types'
import { TYPES, TYPES_LOWER_COLORS, TYPES_UPPER_COLORS, TYPES_BLUR, IPC_SEND_SETTINGS } from '../../_shared/constants'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import { listenTo } from '../_shared/helpers/message'
import { startMediaStream } from './helpers/capturer'
import { handleFrame } from './helpers/frame'


const Game = ({ handleLowerColorChange, lowerColor, handleUpperColorChange, upperColor, blur, handleBlurChange }) => (
  <div>
    <div>
      <div>
        {TYPES.map((type, index) => (
          <div key={`${type}-${index}`}>
            {/* LOWER COLOR */}
            <h3>{type}</h3>
            Lower Color: <br />
            <br />
            B: <input
            type="range"
            onChange={handleLowerColorChange(type, 'b')}
            value={lowerColor[type].b}
            min={1}
            max={255}
          />{lowerColor[type].b} <br />
            G: <input
            type="range"
            onChange={handleLowerColorChange(type, 'g')}
            value={lowerColor[type].g}
            min={1}
            max={255}
          />{lowerColor[type].g} <br />
            R: <input
            type="range"
            onChange={handleLowerColorChange(type, 'r')}
            value={lowerColor[type].r}
            min={1}
            max={255}
          />{lowerColor[type].r} <br />
            <br />
            {/* UPPER COLOR */}
            Upper Color: <br />
            <br />
            B: <input
            type="range"
            onChange={handleUpperColorChange(type, 'b')}
            value={upperColor[type].b}
            min={1}
            max={255}
          />{upperColor[type].b} <br />
            G: <input
            type="range"
            onChange={handleUpperColorChange(type, 'g')}
            value={upperColor[type].g}
            min={1}
            max={255}
          />{upperColor[type].g} <br />
            R: <input
            type="range"
            onChange={handleUpperColorChange(type, 'r')}
            value={upperColor[type].r}
            min={1}
            max={255}
          />{upperColor[type].r} <br />
            <br />
            {/* BLUR */}
            Blur: <input
            type="range"
            onChange={handleBlurChange(type)}
            value={blur[type]}
            min={1}
            max={100}
          />{blur[type]}
          </div>
        ))}
      </div>
    </div>
  </div>
)

Game.propTypes = {
  blur: PropTypes.object.isRequired,
  lowerColor: PropTypes.object.isRequired,
  upperColor: PropTypes.object.isRequired,
  handleLowerColorChange: PropTypes.func.isRequired,
  handleUpperColorChange: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func.isRequired,
}

const enhance = compose(
  withState('lowerColor', 'setLowerColor', TYPES_LOWER_COLORS),
  withState('upperColor', 'setUpperColor', TYPES_UPPER_COLORS),
  withState('blur', 'setBlur', TYPES_BLUR),
  withState('settings', 'setSettings', {
    type: null,
    isRunning: false,
    isStreaming: false,
  }),
  withHandlers({
    handleLowerColorChange: ({ setLowerColor, lowerColor }) => (type, key) => event => {
      lowerColor[type][key] = parseInt(event.target.value, 10)
      setLowerColor(lowerColor)
    },
    handleUpperColorChange: ({ setUpperColor, upperColor }) => (type, key) => event => {
      upperColor[type][key] = parseInt(event.target.value, 10)
      setUpperColor(upperColor)
    },
    handleBlurChange: ({ setBlur, blur }) => type => event => {
      blur[type] = parseInt(event.target.value, 10)
      setBlur(blur)
    },
    handleStreamFrame: handleFrame,
  }),
  lifecycle({
    componentDidMount() {
      const handleStreamFrame = this.props.handleStreamFrame
      startMediaStream(handleStreamFrame)

      listenTo(IPC_SEND_SETTINGS, (event, args) => {
        this.props.setSettings(args.payload)
      })
    },
  }),
)

export default enhance(Game)
