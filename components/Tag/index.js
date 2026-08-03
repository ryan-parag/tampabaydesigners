import React from 'react'

// Static lookups so Tailwind's JIT can see every class we emit.
const MR = { '2': 'mr-2' }
const MT = { '2': 'mt-2' }

const getType = color => {
  switch(color) {
    case 'red':
      return 'bg-red-500'
    case 'blue':
      return 'bg-blue-500'
    case 'green':
      return 'bg-green-500'
    case 'purple':
      return 'bg-purple-500'
    case 'yellow':
      return 'bg-yellow-500'
    case 'indigo':
      return 'bg-indigo-500'
    case 'pink':
      return 'bg-pink-500'
    default:
      return 'bg-white'
  }
}

const Tag = ({color, children, mt, mr}) => {
  return(
    <span
      className={`${MR[mr] || ''} ${MT[mt] || ''} rounded-full inline-flex items-center text-xs tracking-wide py-1 px-3 border bg-white bg-opacity-100 shadow dark:bg-white dark:bg-opacity-5 dark:border-white dark:border-opacity-10 text-black text-opacity-100 dark:text-white dark:text-opacity-100`}
    >
      {
        color && (
          <span className="flex h-2 w-2 relative items-center justify-center mr-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getType(color)} opacity-30`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${getType(color)}`}></span>
          </span>
        )
      }
      {children}
    </span>
  )
}

export default Tag
