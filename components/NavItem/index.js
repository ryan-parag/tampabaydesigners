import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default ({ href, children, ...props }) => {
  const router = useRouter()

  let isActive = null
  if(router.pathname === '/' && router.pathname === href) {
    isActive = `bg-yellow-500 bg-opacity-10 text-yellow-600 dark:text-yellow-500 font-bold`
  } else if (href !== '/' && router.pathname.includes(href)) {
    isActive = `bg-yellow-500 bg-opacity-10 text-yellow-600 dark:text-yellow-500 font-bold`
  } else {
    isActive = `font-semibold hover:bg-gray-100 dark:hover:bg-white dark:hover:bg-opacity-5 text-gray-500 dark:text-white dark:text-opacity-50`
  }

  return (
      <Link href={href}>
        <a>
          <div className={`transition block w-full ${props.center ? 'text-center' : 'text-left px-4'} pt-3 pb-3 rounded-md ${isActive}`}>
            {children}
          </div>
        </a>
      </Link>
  )
}