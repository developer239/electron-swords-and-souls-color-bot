import { ipcRenderer } from 'electron'

export const listenTo = (name: string, callback: (payload?: unknown) => void) => ipcRenderer.on(name, callback)
