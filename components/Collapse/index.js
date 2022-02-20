import React, { useState } from 'react'
import Box from '@components/Box'
import { ChevronDown } from 'react-feather'

const Collapse = ({title, children}) => {

  const [open, setOpen] = useState(false)

  return(
    <Box p={'0'}>
      <div
        role="button"
        onClick={() => setOpen(!open)}
        className="select-none p-4 font-bold text-left transition bg-transparent hover:bg-white hover:bg-opacity-5 flex items-center justify-between"
      >
        {title}
        <div className={`transform relative transition opacity-60 ${open && 'rotate-180'}`}>
          <ChevronDown/>
        </div>
      </div>
      {
        open && (
          <div className="p-4 text-left border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            {children}
          </div>
        )
      }
    </Box>
  )
}

export default Collapse