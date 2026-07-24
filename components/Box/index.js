import React from 'react'
import Link from 'next/link'

// Static lookups so Tailwind's JIT can see every class we emit —
// interpolated names like `mb-${mb}` are invisible to it.
const MB = { '0': 'mb-0', '4': 'mb-4', '12': 'mb-12' }
const MT = { '0': 'mt-0', '4': 'mt-4' }
const P = { '0': 'p-0', '4': 'p-4', '6': 'p-6' }

const spacing = (mb, mt, p) => `${MB[mb] || 'mb-4'} ${MT[mt] || 'mt-4'} ${P[p] || 'p-4'}`

const baseClasses = 'bg-gray-400 bg-opacity-10 rounded ring-1 ring-inset ring-black/[0.08] dark:bg-gray-500 dark:bg-opacity-10 dark:ring-gray-400/10 backdrop-filter backdrop-blur-2xl'

const hoverClasses = 'transition dark:hover:bg-gray-400 dark:hover:bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 hover:scale-105 focus:scale-105'

const ROTATE = { '1': 'hover:rotate-1 focus:rotate-1', '2': 'hover:rotate-2 focus:rotate-2' }

const getTint = type => {
  switch(type) {
    case 'red':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-red-500 opacity-20"></div>)
    case 'blue':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-blue-500 opacity-20"></div>)
    case 'green':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-green-500 opacity-20"></div>)
    case 'indigo':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-indigo-500 opacity-20"></div>)
    case 'yellow':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-yellow-500 opacity-20"></div>)
    case 'purple':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-purple-500 opacity-20"></div>)
    case 'pink':
      return (<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-transparent to-pink-500 opacity-20"></div>)
    default:
      return (<div className="absolute top-0 bottom-0 left-0 right-0 opacity-20"></div>)
  }
}

const Box = ({ children, mb, mt, p }) => {
  return(
    <div className={`w-full ${spacing(mb, mt, p)} ${baseClasses}`}>
      {children}
    </div>
  )
}

export const BoxLink = ({ children, href, mb, mt, p, tint, rotate }) => {
  return (
    <Link
      href={href}
      className={`w-full transform relative overflow-hidden block ${spacing(mb, mt, p)} ${baseClasses} ${hoverClasses} ${ROTATE[rotate] || ''}`}>
      {children}
      { tint && getTint(tint) }
    </Link>
  );
}

export const BoxAnchor = ({ children, href, mb, mt, p, title, tint, rotate }) => {
  return(
    <a target="_blank" title={title} href={href} className={`transform overflow-hidden block ${spacing(mb, mt, p)} ${baseClasses} ${hoverClasses} ${ROTATE[rotate] || ''}`}>
      {children}
      { tint && getTint(tint) }
    </a>
  )
}

export default Box
