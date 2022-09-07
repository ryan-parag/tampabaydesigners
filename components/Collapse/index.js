import React, { useState } from 'react'
import Box from '@components/Box'
import { ChevronDown } from 'react-feather'

const Collapse = ({title, children}) => {

  const [open, setOpen] = useState(false)

  return(
    <div className={`border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10`}>
      <div
        role="button"
        onClick={() => setOpen(!open)}
        className="select-none py-6 font-bold text-left transition bg-transparent hover:text-black dark:hover:text-white flex text-base lg:text-lg items-center justify-between"
      >
        {title}
        <div className={`transform relative transition opacity-60 ${open && 'rotate-180'}`}>
          <ChevronDown/>
        </div>
      </div>
      {
        open && (
          <div className="pb-4 text-left">
            {children}
          </div>
        )
      }
    </div>
  )
}

export default Collapse