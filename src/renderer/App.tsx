import React, { ReactElement } from 'react'

import { Snackbar } from './components/Snackbar'
import { Home } from './pages/Home'
import { useWatchProjectsFolder } from './store/projects/useWatchProjectsFolder'
import { useAutoStopTimer } from './store/useAutoStopTimer'
import { useHandleProjectEdit } from './store/useHandleProjectEdit'
import { useSnackbarOnMessage } from './store/useSnackbarOnMessage'

export const App = (): ReactElement => {
  useSnackbarOnMessage()
  useWatchProjectsFolder()
  useHandleProjectEdit()
  useAutoStopTimer()

  return (
    <>
      <Home />

      <Snackbar />
    </>
  )
}
