import { useEffect } from 'react'

import { useProjectsFolder } from '../settings/useProjectsFolder'

export const useWatchProjectsFolder = () => {
  const [projectsFolder] = useProjectsFolder()

  useEffect(
    () => {
      // on application launch or if the projects folder changes, watch it for changes
      if (projectsFolder) {
        try {
          window.api.watchFolder(projectsFolder)
        } catch (error) {
          console.error(error as Error)
        }
      }

      // cleanup is done in watchFolder on invocation so we don't need to return a cleanup function
    },
    // we don't want this effect to run if currentTracking changes
    // eslint-disable-next-line
    [projectsFolder],
  )
}
