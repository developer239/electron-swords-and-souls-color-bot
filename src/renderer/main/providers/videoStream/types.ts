import { IRecordingOptions } from '../../helpers/recorder'

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
  }
}
