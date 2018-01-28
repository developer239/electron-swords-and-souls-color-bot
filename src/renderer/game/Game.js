import React from 'react'
import PropTypes from 'prop-types'
import { TYPES, LOWER_COLORS, UPPER_COLORS, BLUR, IPC_SEND_SETTINGS } from '../../_shared/constants'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import {
  Container,
  Content,
  Row,
  Column,
} from '../_shared/components'
import { listenTo } from '../_shared/messageHelper'
import { startMediaStream } from './helpers/capturer'
import { handleFrame } from './helpers/detection'


const Game = ({ handleLowerColorChange, lowerColor, handleUpperColorChange, upperColor, blur, handleBlurChange }) => (
  <Container>
    <Content>
      <Row>
        {TYPES.map((type, index) => (
          <Column key={`${type}-${index}`}>
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
          </Column>
        ))}
      </Row>
    </Content>
  </Container>
)

Game.propTypes = {
  blur: PropTypes.object.isRequired,
  lowerColor: PropTypes.object.isRequired,
  upperColor: PropTypes.object.isRequired,
  handleLowerColorChange: PropTypes.func.isRequired,
  handleUpperColorChange: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired,
}

const enhance = compose(
  withState('lowerColor', 'setLowerColor', LOWER_COLORS),
  withState('upperColor', 'setUpperColor', UPPER_COLORS),
  withState('blur', 'setBlur', BLUR),
  withState('settings', 'setSettings', {
    type: null,
    isRunning: false,
    isStreaming: false,
  }),
  withHandlers({
    handleLowerColorChange: ({ setLowerColor, lowerColor }) => (type, key) => (event) => {
      lowerColor[type][key] = parseInt(event.target.value, 10)
      setLowerColor(lowerColor)
    },
    handleUpperColorChange: ({ setUpperColor, upperColor }) => (type, key) => (event) => {
      upperColor[type][key] = parseInt(event.target.value, 10)
      setUpperColor(upperColor)
    },
    handleBlurChange: ({ setBlur, blur }) => type => (event) => {
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
