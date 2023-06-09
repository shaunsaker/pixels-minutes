import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { Ipc } from '../main/ipc/models'

// Custom APIs for renderer
const api = {
  selectFolder: () => ipcRenderer.invoke(Ipc.selectFolder),
  watchFolder: (folder: string) => ipcRenderer.invoke(Ipc.watchFolder, folder),
  onActiveProjectChange: (callback: (project: string) => void) =>
    ipcRenderer.on(Ipc.onActiveProjectChange, (_, project: string) => callback(project)),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI
  // @ts-expect-error (define in dts)
  window.api = api
}
