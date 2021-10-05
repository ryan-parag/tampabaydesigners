import React from 'react'
import Link from 'next/link'

const Box = ({ children, mb, mt, mr, ml, p }) => {
  return(
    <div className={`w-full mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl`}>
      {children}
    </div>
  )
}

export const BoxLink = ({ children, href, mb, mt, mr, ml, p }) => {
  return(
    <Link href={href}>
      <a className={`transform overflow-hidden block mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl transition dark:hover:bg-gray-400 dark:hover:bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 hover:scale-105 focus:scale-105`}>
        {children}
      </a>
    </Link>
  )
}

export const BoxAnchor = ({ children, href, mb, mt, mr, ml, p, title }) => {
  return(
    <a title={title} href={href} className={`transform overflow-hidden block mb-${mb ? mb : '4'} mt-${mt ? mt : '4'} mr-${mr ? mr : '0'} ml-${ml ? ml : '0'} bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 p-${p ? p : '4'} backdrop-filter backdrop-blur-2xl transition dark:hover:bg-gray-400 dark:hover:bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 hover:scale-105 focus:scale-105`}>
      {children}
    </a>
  )
}

export default Box