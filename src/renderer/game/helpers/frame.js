import { send } from '../../_shared/helpers/message'
import { IPC_SEND_VIDEO_SCREEN } from '../../../_shared/constants'
import { playAttack, playDefence, playRange } from './bot'
import { drawMatches } from './image'
import { remote } from 'electron'


const cv = remote.require('opencv4nodejs')

export const handleFrame = ({ settings, lowerColor, upperColor, blur }) => mat => {
  const { isRunning, isStreaming, type } = settings

  if (isRunning && type) {
    const matches = drawMatches({ type, lowerColor, upperColor, blur, mat })

    // TODO: Initialzie bot object here and move the switch into the bot
    switch (type.name) { // eslint-disable-line
      case 'attack':
        playAttack({ mat, matches })
        break
      case 'defence':
        playDefence({ mat, matches })
        break
      case 'range':
        playRange({ mat, matches })
        break
    }
  }

  if (isStreaming) {
    const base64 = cv.imencode('.jpg', mat).toString('base64')
    send(IPC_SEND_VIDEO_SCREEN, base64)
  }
}
