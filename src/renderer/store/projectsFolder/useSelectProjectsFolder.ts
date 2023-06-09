import { useCallback } from 'react'

import { useProjectsFolder } from './useProjectsFolder'

export const useSelectProjectsFolder = () => {
  const [_, setProjectsFolder] = useProjectsFolder()

  const selectProjectsFolder = useCallback(async () => {
    const { canceled, filePaths } =
      (await window.api.selectFolder()) as Electron.OpenDialogReturnValue

    if (!canceled) {
      setProjectsFolder(filePaths[0])
    }
  }, [setProjectsFolder])

  return selectProjectsFolder
}
