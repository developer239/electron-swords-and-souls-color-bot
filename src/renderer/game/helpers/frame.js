import { remote } from 'electron'
import Bot from './bot'
import { playAttack, playDefence, playRange } from './play'
import { drawMatches } from './image'
import { send } from '../../_shared/helpers/message'
import { IPC_SEND_VIDEO_SCREEN } from '../../../_shared/constants'


const cv = remote.require('opencv4nodejs')

const gameBot = new Bot()

export const handleFrame = ({ settings, lowerColor, upperColor, blur }) => mat => {
  const { isRunning, isStreaming, type } = settings

  if (isRunning && type) {
    const matches = drawMatches({ type, lowerColor, upperColor, blur, mat })

    switch (type.name) { // eslint-disable-line
      case 'attack':
        playAttack({ mat, matches, gameBot })
        break
      case 'defence':
        playDefence({ mat, matches, gameBot })
        break
      case 'range':
        playRange({ mat, matches, gameBot })
        break
    }
  }

  if (isStreaming) {
    const base64 = cv.imencode('.jpg', mat).toString('base64')
    send(IPC_SEND_VIDEO_SCREEN, base64)
  }
}
