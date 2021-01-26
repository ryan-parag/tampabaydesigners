import React from 'react'

const Alert = ({type, children, ...props}) => {

  let stateClass = ''

  switch (type) {
    case 'danger':
      stateClass = 'bg-red-500 bg-opacity-20 text-red-700 dark:text-red-300'
      break;
    case 'info':
      stateClass = 'bg-blue-500 bg-opacity-20 text-blue-700 dark:text-blue-300'
      break;
    case 'success':
      stateClass = 'bg-green-500 bg-opacity-20 text-green-700 dark:text-green-300'
      break;
    case 'warning':
      stateClass = 'bg-yellow-500 bg-opacity-20 text-yellow-900 dark:text-yellow-300'
      break;
    default:
      stateClass = 'bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10'
  }

  return(
    <div className={`rounded-md ${props.size === 'small' ? 'p-2 text-xs mb-2': 'p-4 text-sm mb-4'} ${stateClass}`}>
      {children}
    </div>
  )
}

export default Alert