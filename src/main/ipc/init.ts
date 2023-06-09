import { BrowserWindow } from 'electron'

import { selectFolder } from '../selectFolder'
import { watchFolder } from '../watchFolder'

export function initIpc(window: BrowserWindow): void {
  selectFolder()
  watchFolder(window)
}
