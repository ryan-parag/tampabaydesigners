import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const TabItem = ({ href, children, ...props }) => {
  const router = useRouter()

  let isActive = null
  if (props.state === 'active') {
    isActive = `font-bold border-yellow-500 border-b-2`
  } else {
    isActive = `border-b border-transparent text--secondary hover:text-black dark:hover:text-white hover:bg-yellow-500 hover:bg-opacity-10`
  }

  return (
    <Link href={href}>
      <a>
        <div className={`text-sm text-center transition block w-full ${props.center ? 'text-center' : 'text-left px-4'} pt-3 pb-3 ${isActive}`}>
          {children}
        </div>
      </a>
    </Link>
  )
}

export default TabItem