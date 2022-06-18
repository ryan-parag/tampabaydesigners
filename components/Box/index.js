import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Box = ({ children, mb, mt, mr, ml, p }) => {
  return(
    <div className={`w-full mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl`}>
      {children}
    </div>
  )
}

export const BoxLink = ({ children, href, mb, mt, mr, ml, p, tint, rotate }) => {

  const getTint = type => {
    switch(type) {
      case 'red':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-red-500 opacity-20"></div>)
        break;
      case 'blue':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-blue-500 opacity-20"></div>)
        break;
      case 'green':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-green-500 opacity-20"></div>)
        break;
      case 'indigo':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-indigo-500 opacity-20"></div>)
        break;
      case 'yellow':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-yellow-500 opacity-20"></div>)
        break;
      case 'purple':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-purple-500 opacity-20"></div>)
        break;
      default:
        return (<div className="absolute top-0 bottom-0 left-0 right-0 opacity-20"></div>)
    }
  }

  return(
    <Link href={href}>
      <a className={`w-full transform relative overflow-hidden block mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl transition dark:hover:bg-gray-400 dark:hover:bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 hover:scale-105 focus:scale-105 ${rotate && `hover:rotate-${rotate}`}`}>
        {children}
        {
          tint && (
            <>
              { getTint(tint) }
            </>
          )
        }
      </a>
    </Link>
  )
}

export const BoxAnchor = ({ children, href, mb, mt, mr, ml, p, title, tint, rotate }) => {

  const getTint = type => {
    switch(type) {
      case 'red':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-red-500 opacity-20"></div>)
        break;
      case 'blue':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-blue-500 opacity-20"></div>)
        break;
      case 'green':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-green-500 opacity-20"></div>)
        break;
      case 'indigo':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-indigo-500 opacity-20"></div>)
        break;
      case 'yellow':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-yellow-500 opacity-20"></div>)
        break;
      case 'purple':
        return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-purple-500 opacity-20"></div>)
        break;
      default:
        return (<div className="absolute top-0 bottom-0 left-0 right-0 opacity-20"></div>)
    }
  }

  return(
    <a target="_blank" title={title} href={href} className={`transform overflow-hidden block mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl transition dark:hover:bg-gray-400 dark:hover:bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 hover:scale-105 focus:scale-105 ${rotate && `hover:rotate-${rotate}`}`}>
      {children}
      {
        tint && (
          <>
            { getTint(tint) }
          </>
        )
      }
    </a>
  )
}

export default Box