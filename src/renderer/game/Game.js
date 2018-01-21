import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import {
  Container,
  Content,
  Row,
  Column,
} from '../_shared/components'
import { startMediaStream } from './helpers/desktopCapturer'


const TYPES = ['apple', 'star']

const Game = ({ handleLowerColorChange, lowerColor, handleUpperColorChange, upperColor, blur, handleBlurChange }) => (
  <Container>
    <Content>
      <Row>
        {TYPES.map(type => (
          <Column>
            {/* LOWER COLOR */}
            <h3>{type}</h3>
            Lower Color: <br />
            <br />
            B: <input
            type="range"
            onChange={handleLowerColorChange(type, 'b')}
            value={lowerColor[type].b}
            min={0}
            max={255}
          />{lowerColor[type].b} <br />
            G: <input
            type="range"
            onChange={handleLowerColorChange(type, 'g')}
            value={lowerColor[type].g}
            min={0}
            max={255}
          />{lowerColor[type].g} <br />
            R: <input
            type="range"
            onChange={handleLowerColorChange(type, 'r')}
            value={lowerColor[type].r}
            min={0}
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
            min={0}
            max={255}
          />{upperColor[type].b} <br />
            G: <input
            type="range"
            onChange={handleUpperColorChange(type, 'g')}
            value={upperColor[type].g}
            min={0}
            max={255}
          />{upperColor[type].g} <br />
            R: <input
            type="range"
            onChange={handleUpperColorChange(type, 'r')}
            value={upperColor[type].r}
            min={0}
            max={255}
          />{upperColor[type].r} <br />
            <br />
            {/* BLUR */}
            Blur: <input
            type="range"
            onChange={handleBlurChange(type)}
            value={blur[type]}
            min={0}
            max={100}
          />{blur[type]}
          </Column>
        ))}
      </Row>
    </Content>
  </Container>
)

Game.propTypes = {
  blur: PropTypes.number.isRequired,
  lowerColor: PropTypes.object.isRequired,
  upperColor: PropTypes.object.isRequired,
  handleLowerColorChange: PropTypes.func.isRequired,
  handleUpperColorChange: PropTypes.func.isRequired,
  handleBlurChange: PropTypes.func.isRequired,
}

const enhance = compose(
  withState('lowerColor', 'setLowerColor', { apple: { b: 10, g: 10, r: 130 }, star: { b: 0, g: 100, r: 200 } }),
  withState('upperColor', 'setUpperColor', { apple: { b: 200, g: 65, r: 255 }, star: { b: 130, g: 255, r: 255 } }),
  withState('blur', 'setBlur', { apple: 10, star: 5 }),
  withHandlers({
    handleLowerColorChange: ({ setLowerColor, lowerColor }) => (type, key) => (event) => {
      lowerColor[type][key] = event.target.value
      setLowerColor(lowerColor)
    },
    handleUpperColorChange: ({ setUpperColor, upperColor }) => (type, key) => (event) => {
      upperColor[type][key] = event.target.value
      setUpperColor(upperColor)
    },
    handleBlurChange: ({ setBlur, blur }) => type => (event) => {
      blur[type] = event.target.value
      setBlur(blur)
    },
  }),
  lifecycle({
    componentDidMount() {
      startMediaStream()
    },
  }),
)

export default enhance(Game)
