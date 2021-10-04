import React, { useState } from 'react'
import Logo from '@components/Logo'
import Link from 'next/link'
import { Menu, X } from 'react-feather'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const NavItem = ({ href, name, mobile, state }) => {

  const getClasses = (x) => {
    if(x === 'Hangouts') {
      return `border-b-2 inline-flex p-4 text-yellow-600 dark:text-yellow-500 transition hover:bg-yellow-500 hover:bg-opacity-10 hover:text-yellow-700 dark:hover:bg-yellow-500 dark:hover:text-yellow-300 dark:hover:bg-opacity-10 ${state === 'active' ? 'border-yellow-500' : 'border-transparent'}`
    } else {
      return `border-b-2 inline-flex p-4 transition text-black dark:text-white text-opacity-50 dark:text-opacity-50 hover:bg-yellow-500 hover:bg-opacity-10 dark:hover:bg-yellow-500 dark:hover:bg-opacity-10 hover:text-opacity-100 dark:hover:text-opacity-100 ${state === 'active' ? 'border-yellow-500' : 'border-transparent'}`
    }
  }

  const getMobileClasses = (x) => {
    if(x === 'Hangouts') {
      return `block transition px-4 py-8 text-center text-2xl hover:bg-black hover:text-opacity-100 dark:hover:bg-white dark:hover:text-opacity-100 hover:bg-opacity-10 dark:hover:bg-opacity-10 ${state === 'active' ? 'text-yellow-700 dark:text-yellow-300' : 'text-black dark:text-white text-opacity-50 dark:text-opacity-50'}`
    } else {
      return `block transition px-4 py-8 text-center text-2xl hover:bg-black hover:text-opacity-100 dark:hover:bg-white dark:hover:text-opacity-100 hover:bg-opacity-10 dark:hover:bg-opacity-10 ${state === 'active' ? 'text-yellow-700 dark:text-yellow-300' : 'text-black dark:text-white text-opacity-50 dark:text-opacity-50'}`
    }
  }

  return(
    <Link href={href}>
      <a
        className={mobile ? getMobileClasses(name) : getClasses(name)}
      >
        {name}
      </a>
    </Link>
  )
}

const Header = () => {

  const router = useRouter()

  const navItems = [
    {
      name: 'Groups',
      link: 'groups'
    }, {
      name: 'Slack',
      link: 'slack'
    }, {
      name: 'Events',
      link: 'events'
    }, {
      name: 'Hangouts',
      link: 'hangouts'
    }
  ]

  const activeNavItem = (href) => {
    if(router.pathname === '/' && router.pathname === href) {
      return 'active'
    } else if (href !== '/' && router.pathname.includes(href)) {
      return 'active'
    } else {
      return 'default'
    }
  }

  const [ open, setOpen ] = useState(false)

  return(
    <>
      <div className="border-b border-gray-500 border-opacity-10 dark:bg-gray-600 dark:bg-opacity-10 dark:border-gray-700 dark:border-opacity-30 px-4 backdrop-filter backdrop-blur-2xl">
        <div className="container mx-auto py-2 md:py-0 flex justify-between items-center">
          <button
            className="inline-flex md:hidden transition dark:hover:bg-black hover:bg-gray-100 text-black dark:text-white hover:text-opacity-100 dark:hover:text-opacity-100 text-opacity-50 dark:text-opacity-50 rounded-full p-2"
            onClick={() => setOpen(true)}
          >
            <Menu size={20}/>
          </button>
          <Logo small />
          <button className="opacity-0 p-2 invisible">
            <Menu size={20}/>
          </button>
          <ul className="hidden md:flex">
            {
              navItems.map((item, i) => (
                <li key={i}>
                  <NavItem
                    name={item.name}
                    href={item.link}
                    state={activeNavItem(item.link)}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      {
        open && (
          <div className="fixed backdrop-filter backdrop-blur-2xl bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-70 top-0 bottom-0 right-0 left-0 z-40">
            <div className="flex justify-between px-4 py-2">
              <button
                className="inline-flex md:hidden transition dark:hover:bg-black hover:bg-gray-100 text-black dark:text-white hover:text-opacity-100 dark:hover:text-opacity-100 text-opacity-50 dark:text-opacity-50 rounded-full p-2"
                onClick={() => setOpen(false)}
              >
                <X size={20}/>
              </button>
              <Logo small mono />
              <span className="p-2 invisible">
                <X size={20}/>
              </span>
            </div>
            <ul>
              {
                navItems.map((item, i) => (
                  <motion.li
                    className="transition block top-4 opacity-0"
                    key={i}
                    animate={{ top: 0, opacity: 1 }}
                    transition={{ duration: 0.24, delay: 0.1*i }}
                  >
                    <NavItem
                      mobile
                      name={item.name}
                      href={item.link}
                      state={activeNavItem(item.link)}
                    />
                  </motion.li>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
  )
}

export default Header