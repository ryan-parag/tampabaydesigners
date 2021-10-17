import React from 'react'

const Tag = ({color, children, ml, mt, mb, mr}) => {

  const getType = color => {
    switch(color) {
      case 'red':
        return 'bg-red-500'
        break;
      case 'blue':
        return 'bg-blue-500'
        break;
      case 'green':
        return 'bg-green-500'
        break;
      case 'purple':
        return 'bg-purple-500'
        break;
      case 'yellow':
        return 'bg-yellow-500'
        break;
      case 'indigo':
        return 'bg-indigo-500'
        break;
      case 'pink':
        return 'bg-pink-500'
        break;
      default:
        return 'bg-white'
    }
  }

  return(
    <span
      className={`mb-${mb ? mb : '0'} mt-${mt ? mt : '0'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} rounded-full inline-flex items-center text-xs tracking-wide py-1 px-3 border bg-white bg-opacity-100 shadow dark:bg-white dark:bg-opacity-10 dark:border-opacity-10 text-black text-opacity-100 dark:text-white dark:text-opacity-100`}
    >
      {
        color && (
          <span class="flex h-2 w-2 relative items-center justify-center mr-2">
            <span class={`animate-ping absolute inline-flex h-full w-full rounded-full ${getType(color)} opacity-30`}></span>
            <span class={`relative inline-flex rounded-full h-2 w-2 ${getType(color)}`}></span>
          </span>
        )
      }
      {children}
    </span>
  )
}

export default Tag