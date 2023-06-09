import { FolderIcon } from '@heroicons/react/24/outline'
import { Button, Subtitle, Text, Title } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useSelectProjectsFolder } from '../../../store/projects/useSelectProjectsFolder'

export const WelcomeView = (): ReactElement => {
  const selectProjectsFolder = useSelectProjectsFolder()

  return (
    <div>
      <Title>
        Welcome to <b>Pixels Minutes</b> 🎨⏱️
      </Title>

      <Subtitle>
        The ingenious automated time tracker designed specifically for creative professionals.
      </Subtitle>

      <Text className="mt-4">
        Simply choose the folder where you store all your projects, and let Pixel Minutes do the
        rest.
      </Text>

      <Button className="mt-4" icon={FolderIcon} onClick={selectProjectsFolder}>
        Select Projects folder
      </Button>
    </div>
  )
}
