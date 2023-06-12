import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Button, Card, Text, Title } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

import { Backdrop } from './Backdrop'

type AlertDialogProps = {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  children: ReactNode
  onConfirmClick: () => void
  onCancelClick?: () => void
}

export const AlertDialog = ({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
  onConfirmClick,
  onCancelClick,
}: AlertDialogProps): ReactElement => {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger asChild>{children}</AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay asChild>
          <Backdrop />
        </AlertDialogPrimitive.Overlay>

        <div className="fixed inset-0 flex flex-col justify-center items-center">
          <AlertDialogPrimitive.Content asChild>
            <Card className="max-w-lg flex flex-col gap-2">
              <AlertDialogPrimitive.Title asChild>
                <Title>{title}</Title>
              </AlertDialogPrimitive.Title>

              <AlertDialogPrimitive.Description asChild>
                <Text>{description}</Text>
              </AlertDialogPrimitive.Description>

              <div className="mt-4 flex justify-end gap-4">
                <AlertDialogPrimitive.Cancel asChild>
                  <Button color="gray" variant="secondary" onClick={onCancelClick}>
                    {cancelText}
                  </Button>
                </AlertDialogPrimitive.Cancel>

                <AlertDialogPrimitive.Action asChild>
                  <Button color="red" onClick={onConfirmClick}>
                    {confirmText}
                  </Button>
                </AlertDialogPrimitive.Action>
              </div>
            </Card>
          </AlertDialogPrimitive.Content>
        </div>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
