import React, { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { Snackbar } from './components/Snackbar'
import { Home } from './pages/Home'
import { useCurrentTracking } from './store/currentTracking/useCurrentTracking'
import { useStartTracking } from './store/currentTracking/useStartTracking'
import { useStopTracking } from './store/currentTracking/useStopTracking'
import { useCreateProject } from './store/projects/useCreateProject'
import { useProjects } from './store/projects/useProjects'
import { useProjectsFolder } from './store/settings/useProjectsFolder'
import { useRefEventListener } from './utils/useRefEventListener'

export const App = (): ReactElement => {
  const [currentTracking] = useCurrentTracking()
  const [projects] = useProjects()
  const [projectsFolder] = useProjectsFolder()
  const createProject = useCreateProject()
  const startTracking = useStartTracking()
  const stopTracking = useStopTracking()

  useEffect(() => {
    // listen for any ipc messages and render snackbars accordingly
    window.api.onMessage(({ message, type }) => {
      if (type === 'success') {
        toast.success(message)
      }

      if (type === 'error') {
        toast.error(message)
      }
    })
  }, [])

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

  // since the listener won't have access to fresh state, we need to handle the cb in a ref
  const handleActiveProjectChangeRef = useRefEventListener((projectId: string) => {
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
        window.api.onActiveProjectChange((projectId: string) => {
          handleActiveProjectChangeRef.current(projectId)
        })
      }

      // FIXME: we should somehow add a cleanup function but this is only affected by hot reloading
    },
    // we only want this effect to run once
    // eslint-disable-next-line
    [projectsFolder],
  )

  return (
    <>
      <Home />

      <Snackbar />
    </>
  )
}
