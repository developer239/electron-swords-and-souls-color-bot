import React from 'react'
import { compose, lifecycle } from 'recompose'
import {
  Container,
  Content,
  Text,
} from '../_shared/components'
import { startMediaStream } from './helpers/desktopCapturer'


const Main = () => (
  <Container>
    <Content>
      <Text>Hidden Game Window</Text>
    </Content>
  </Container>
)

Main.propTypes = {}

const enhance = compose(
  lifecycle({
    componentDidMount() {
      startMediaStream()
    },
  }),
)

export default enhance(Main)
