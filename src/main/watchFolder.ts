import { BrowserWindow, ipcMain } from 'electron'
import { readdirSync } from 'fs'
import fs from 'fs'
import path from 'path'
import { FSWatcher } from 'vite'

import { Ipc } from './ipc/models'

export const watchFolder = (window: BrowserWindow) => {
  let watcher: FSWatcher
  let activeProject = ''

  ipcMain.handle(Ipc.watchFolder, async (_, folder: string): Promise<void> => {
    console.log({ activeProject, watcher })

    // close any existing watchers, e.g. when the user selects a new folder
    if (watcher) {
      console.log('Closing existing watcher...')
      watcher.close()
    }

    const projects = readdirSync(folder).filter(filePath => {
      // TODO: SS temp ignore working directory
      if (filePath === 'pixels-minutes') {
        return false
      }

      try {
        const stat = fs.statSync(path.join(folder, filePath))
        return stat.isDirectory()
      } catch (error) {
        // fail silently
        return false
      }
    })

    // @ts-expect-error FIXME:
    watcher = fs.watch(folder, { recursive: true }, (_, filename) => {
      if (filename) {
        const project = projects.find(project => filename.includes(project))

        if (project && project !== activeProject) {
          activeProject = project
          console.log('New project', { activeProject })

          window.webContents.send(Ipc.onActiveProjectChange, activeProject)
        }
      }
    })
  })
}