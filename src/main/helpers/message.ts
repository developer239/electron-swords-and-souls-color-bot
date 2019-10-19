import { IWindowReference } from './window'

const ipcMain = require('electron').ipcMain

export const listenTo = (name: string, callback: Function) => ipcMain.on(name, callback)

export const send = (event: IWindowReference) => (name: string, payload?: unknown) => {
  if (event.window) {
    event.window.webContents.send(name, { payload })
  }
}
