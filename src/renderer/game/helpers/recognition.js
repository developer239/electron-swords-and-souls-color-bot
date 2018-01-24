import { send } from '../../_shared/messageHelper'
import { SEND_VIDEO_SCREEN } from '../../../_shared/constants'
import { remote } from "electron"


const cv = remote.require('opencv4nodejs')

export const handleFrame = (mat) => {
  const base64 = cv.imencode('.jpg', mat).toString('base64')
  send(SEND_VIDEO_SCREEN, base64)
}
