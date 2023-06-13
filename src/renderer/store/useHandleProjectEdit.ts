import dayjs from 'dayjs'
import { useEffect } from 'react'

import { useRefEventListener } from '../utils/useRefEventListener'
import { useCurrentTracking } from './currentTracking/useCurrentTracking'
import { useStartTracking } from './currentTracking/useStartTracking'
import { useStopTracking } from './currentTracking/useStopTracking'
import { useCreateProject } from './projects/useCreateProject'
import { useProjects } from './projects/useProjects'
import { useProjectsFolder } from './settings/useProjectsFolder'
import { useTimeLastActive } from './useTimeLastActive'

export const useHandleProjectEdit = () => {
  const [currentTracking] = useCurrentTracking()
  const [projects] = useProjects()
  const [projectsFolder] = useProjectsFolder()
  const [_, setTimeLastActive] = useTimeLastActive()
  const createProject = useCreateProject()
  const startTracking = useStartTracking()
  const stopTracking = useStopTracking()

  // since the listener won't have access to fresh state, we need to handle the cb in a ref
  const handleActiveProjectChangeRef = useRefEventListener((projectId: string) => {
    setTimeLastActive(dayjs().toISOString())

    // if the project does not yet exist, add it
    if (!projects[projectId]) {
      createProject(projectId)
    }

    // if the project changed, stop any existing tracking and start tracking the new project
    if (currentTracking?.projectId !== projectId) {
      if (currentTracking) {
        stopTracking()
      }

      startTracking(projectId)
    }
  })

  useEffect(
    () => {
      // handle active project change events
      if (projectsFolder) {
        window.api.onProjectEdit((projectId: string) => {
          handleActiveProjectChangeRef.current(projectId)
        })
      }

      // FIXME: we should somehow add a cleanup function but this is only affected by hot reloading
    },
    // we only want this effect to run once
    // eslint-disable-next-line
    [projectsFolder],
  )
}
