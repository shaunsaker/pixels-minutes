import { Text } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { resolveValue, useToaster } from 'react-hot-toast'

export const Snackbar = (): ReactElement => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  return (
    <div
      className="fixed z-30 top-0 inset-x-0 pointer-events-none flex flex-col items-center"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      <AnimatePresence initial={false}>
        {toasts
          .filter(toast => toast.visible)
          .map(toast => {
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -64, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { delay: 1, duration: 0.2 },
                }}
              >
                <div
                  className={`max-w-xs md:max-w-md mt-2 rounded border shadow-md py-2 px-4 text-center ${
                    toast.type === 'success'
                      ? 'border-green-500 dark:border-green-600 bg-green-600 dark:bg-green-700'
                      : 'border-red-500 dark:border-red-600 bg-red-600 dark:bg-red-700'
                  }`}
                >
                  <Text className="text-white">{resolveValue(toast.message, toast)}</Text>
                </div>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}
