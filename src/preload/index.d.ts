import { ElectronAPI } from '@electron-toolkit/preload'

import { Message } from '.'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectFolder: () => Promise<Electron.OpenDialogReturnValue>
      watchFolder: (folder: string) => void
      onActiveProjectChange: (callback: (project: string) => void) => void
      exportPdf: () => Promise<void>
      onMessage: (callback: (message: Message) => void) => void
    }
  }
}
