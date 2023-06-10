import dayjs from 'dayjs'
import { BrowserWindow, dialog, ipcMain } from 'electron'
import fs from 'fs'

import { Ipc } from './ipc/models'

export const exportPdf = (window: BrowserWindow) => {
  ipcMain.handle(Ipc.ExportPdf, async _ => {
    const filename = `time-entries-${dayjs().format('DD-MM-YYYY')}.pdf`
    const { filePath, canceled } = await dialog.showSaveDialog(window, { defaultPath: filename })

    if (canceled || !filePath) {
      return
    }

    try {
      const pdf = await window.webContents.printToPDF({
        pageSize: 'A4',
        printBackground: true,
      })

      fs.writeFile(filePath, pdf, error => {
        if (error) {
          console.error('writeFile', error)

          window.webContents.send(Ipc.OnMessage, {
            message: (error as Error).message,
            type: 'error',
          })
        } else {
          const message = `Pdf exported successfully!`
          console.log(message)

          window.webContents.send(Ipc.OnMessage, {
            message: message,
            type: 'success',
          })
        }
      })
    } catch (error) {
      console.error('printToPDF', error)

      window.webContents.send(Ipc.OnMessage, {
        message: (error as Error).message,
        type: 'error',
      })
    }
  })
}
