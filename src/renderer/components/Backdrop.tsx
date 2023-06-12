import React, { forwardRef } from 'react'

export const Backdrop = forwardRef((_, ref: any) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-gray-900 dark:bg-white bg-opacity-50 dark:bg-opacity-20"
    />
  )
})
