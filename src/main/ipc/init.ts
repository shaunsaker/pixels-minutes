import { BrowserWindow } from 'electron'

import { exportPdf } from '../exportPdf'
import { selectFolder } from '../selectFolder'
import { watchFolder } from '../watchFolder'

export function initIpc(window: BrowserWindow): void {
  selectFolder()
  watchFolder(window)
  exportPdf(window)
}
