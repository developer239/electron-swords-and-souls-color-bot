import { app } from 'electron'
import { installExtensions } from './helpers/extensions'
import './windows/game'
import './windows/main'

app.on('ready', async () => {
  await installExtensions()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
