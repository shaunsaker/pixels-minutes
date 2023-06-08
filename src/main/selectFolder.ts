import { dialog, ipcMain } from 'electron'

import { Ipc } from '../common/ipc'

export const selectFolder = () => {
  ipcMain.handle(Ipc.selectFolder, async () => {
    const response = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: 'Select',
    })

    return response
  })
}
