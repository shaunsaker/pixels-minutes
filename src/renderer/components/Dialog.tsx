import { XMarkIcon } from '@heroicons/react/24/outline'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Button, Card, Text, Title } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

import { Backdrop } from './Backdrop'

type DialogProps = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  trigger?: ReactNode
  children?: ReactNode
  onConfirmClick?: () => void
  onCancelClick?: () => void
}

export const Dialog = ({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  trigger,
  children,
  onConfirmClick,
  onCancelClick,
}: DialogProps): ReactElement => {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <Backdrop />
        </DialogPrimitive.Overlay>

        <div className="fixed inset-0 flex flex-col justify-center items-center">
          <DialogPrimitive.Content asChild>
            <Card className="relative max-w-lg flex flex-col gap-2">
              <DialogPrimitive.Title asChild>
                <Title className="mb-4">{title}</Title>
              </DialogPrimitive.Title>

              <DialogPrimitive.Description asChild>
                <Text>{description}</Text>
              </DialogPrimitive.Description>

              {children}

              <div className="mt-6 flex justify-end gap-4">
                <DialogPrimitive.Close asChild>
                  <Button color="gray" variant="secondary" onClick={onCancelClick}>
                    {cancelText}
                  </Button>
                </DialogPrimitive.Close>

                <DialogPrimitive.Close asChild>
                  <Button onClick={onConfirmClick}>{confirmText}</Button>
                </DialogPrimitive.Close>
              </div>

              <DialogPrimitive.Close asChild>
                <button className="absolute top-6 right-6" aria-label="Close">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </DialogPrimitive.Close>
            </Card>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
