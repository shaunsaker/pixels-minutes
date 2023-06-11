import { FolderIcon } from '@heroicons/react/24/outline'
import { Button, Subtitle, Text, Title } from '@tremor/react'
import React, { ReactElement } from 'react'

import { useSelectProjectsFolder } from '../../../store/settings/useSelectProjectsFolder'

export const WelcomeView = (): ReactElement => {
  const selectProjectsFolder = useSelectProjectsFolder()

  return (
    <div className="pt-2">
      <Title className="mb-6">
        Welcome to <b>Pixels Minutes</b> 🎨⏱️
      </Title>

      <div className="max-w-lg flex flex-col items-center gap-6">
        <Subtitle>
          The ingenious automated time tracker designed specifically for creative professionals.
        </Subtitle>

        <Text>
          Simply choose the folder where you store all your projects, and let Pixel Minutes do the
          rest.
        </Text>

        <Button icon={FolderIcon} onClick={selectProjectsFolder}>
          Select Projects folder
        </Button>
      </div>
    </div>
  )
}
