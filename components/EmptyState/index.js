import React from 'react'
import { Frown } from 'react-feather'

export default function EmptyState({children}) {
  return (
    <div className="items-center flex flex-col py-12 px-4 rounded-md text-black text-opacity-50 bg-black bg-opacity-5 dark:text-white dark:text-opacity-50 dark:bg-white dark:bg-opacity-5">
      <Frown
        size={'40'}
        className="mb-4"
      />
      {children}
    </div>
  )
}