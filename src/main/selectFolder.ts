import { dialog, ipcMain } from 'electron'

import { Ipc } from './ipc/models'

export const selectFolder = () => {
  ipcMain.handle(Ipc.SelectFolder, async () => {
    const response = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: 'Select',
    })

    return response
  })
}
