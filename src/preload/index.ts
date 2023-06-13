import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

export type Message = { message: string; type: 'success' | 'error' }

import { Ipc } from '../main/ipc/models'

// Custom APIs for renderer
const api = {
  selectFolder: () => ipcRenderer.invoke(Ipc.SelectFolder),
  watchFolder: (folder: string) => ipcRenderer.invoke(Ipc.WatchFolder, folder),
  onProjectEdit: (callback: (project: string) => void) =>
    ipcRenderer.on(Ipc.OnProjectEdit, (_, project: string) => callback(project)),
  exportPdf: () => ipcRenderer.invoke(Ipc.ExportPdf),
  onMessage: (callback: (message: Message) => void) =>
    ipcRenderer.on(Ipc.OnMessage, (_, message: Message) => callback(message)),
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
