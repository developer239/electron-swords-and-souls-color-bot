import { IRecordingOptions } from '../../helpers/recorder'
import { IScript } from '../../components/Stream/types'

export interface IVideoStreamContext {
  state: {
    isPlaying: boolean
  }
  actions: {
    initializeStream: (
      options: IRecordingOptions,
      canvas: HTMLImageElement
    ) => void
    play: VoidFunction
    pause: VoidFunction
    handleSetScript: (script?: IScript) => void
  }
}
