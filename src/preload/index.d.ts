import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectFolder: () => Promise<Electron.OpenDialogReturnValue>
      watchFolder: (folder: string) => void
      onActiveProjectChange: (callback: (project: string) => void) => void
    }
  }
}
