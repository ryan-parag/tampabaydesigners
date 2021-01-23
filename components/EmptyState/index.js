import React from 'react'
import { Frown, Check, AlertTriangle, Info } from 'react-feather'

export default function EmptyState({children, ...props}) {

  let stateClass = ''
  
  switch (props.type) {
    case 'danger':
      stateClass = 'bg-red-500 bg-opacity-10 dark:bg-opacity-20 text-red-500 dark:text-red-400'
      break;
    case 'info':
      stateClass = 'bg-blue-500 bg-opacity-10 dark:bg-opacity-20 text-blue-500 dark:text-blue-400'
      break;
    case 'success':
      stateClass = 'bg-green-500 bg-opacity-10 dark:bg-opacity-20 text-green-500'
      break;
    case 'warning':
      stateClass = 'bg-yellow-500 bg-opacity-10 dark:bg-opacity-20 text-yellow-600 dark:text-yellow-500'
      break;
    default:
      stateClass = 'text-black text-opacity-50 bg-black bg-opacity-5 dark:text-white dark:text-opacity-50 dark:bg-white dark:bg-opacity-5'
  }

  const getIcon = (type) => {
    switch (type) {
      case 'danger':
        return <Frown size={'40'} className="mb-4"/>
        break;
      case 'info':
        return <Info size={'40'} className="mb-4"/>
        break;
      case 'success':
        return <Check size={'40'} className="mb-4"/>
        break;
      case 'warning':
        return <AlertTriangle size={'40'} className="mb-4"/>
        break;
      default:
        return <Frown size={'40'} className="mb-4"/>
    }
  }

  return (
    <div className={`items-center flex flex-col py-12 px-4 rounded-md ${stateClass}`}>
      {getIcon(props.type)}
      {children}
    </div>
  )
}