import { send } from '../../_shared/messageHelper'
import { SEND_VIDEO_SCREEN } from '../../../_shared/constants'
import { drawMatches, playAttack, playDefence } from './bot'
import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const handleFrame = ({ settings, lowerColor, upperColor, blur }) => (mat, index) => {
  const { isRunning, isStreaming, type } = settings

  if (isRunning && type) {
    const matches = drawMatches({ type, lowerColor, upperColor, blur, mat })
    if (index % 20 === 0) {
      console.log('matches ', matches)
    }
    if (type.name === 'attack') {
      playAttack({ mat, matches })
    }
    if (type.name === 'defence') {
      playDefence({ mat, matches })
    }
  }

  if (index % 40 === 0) {
    console.timeEnd('Handle frame')
  }
  console.time('Handle frame')

  if (isStreaming) {
    if (index % 20 === 0) {
      console.log('Sending Frame')
    }
    const base64 = cv.imencode('.jpg', mat).toString('base64')
    send(SEND_VIDEO_SCREEN, base64)
  }
}
