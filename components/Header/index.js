import React, { useState } from 'react'
import Logo from '@components/Logo'
import NavItem from '@components/NavItem'
import { motion } from 'framer-motion'
import { Menu, X } from 'react-feather'
import TabItem from '@components/TabItem'
import { useRouter } from 'next/router'

export default function Header() {

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    {
      name: 'Home',
      href: '/'
    },{
      name: 'Slack',
      href: '/slack'
    },{
      name: 'Events',
      href: '/events'
    },{
      name: 'Interviews',
      href: '/interviews'
    },{
      name: 'Links',
      href: '/links'
    },{
      name: 'Jobs',
      href: '/jobs'
    },{
      name: 'About',
      href: '/about'
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

  return (
    <>
      <header className="flex flex-col items-center w-full mb-4">
        <div className="flex justify-center bg-white dark:bg-black border-b border-gray-200 dark:border-white dark:border-opacity-10 w-full mb-8">
          <nav className="hidden sm:flex w-full sm:w-full md:w-3/4 lg:w-1/2" role="navigation" aria-label="main navigation">
            {
              navigation.map(item => (
                <div
                  className="w-full flex"
                  key={item.name}
                >
                  <TabItem
                    href={item.href}
                    center
                    state={activeNavItem(item.href)}
                  >
                    {item.name}
                  </TabItem>
                </div>
              ))
            }
          </nav>
          <div className="w-full block sm:hidden">
            <div className="px-4 py-2 flex sm:hidden w-full items-center justify-between">
              <Logo small/>
              <button onClick={() => setOpen(!open)} className="py-2 px-4 rounded-md bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 focus:outline-none">
                {
                  open ? (
                    <X
                      size={'20'}
                    />
                  )
                  :
                  (
                    <Menu
                      size={'20'}
                    />
                  )
                }
              </button>
            </div>
            {
              open ? (
                <motion.nav
                  className="flex sm:hidden flex-col p-2 pt-4 bg-gray-100 dark:bg-white dark:bg-opacity-5 h-0 overflow-hidden"
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.5, delay: 0 }}
                >
                  {
                    navigation.map(item => (
                      <div
                        className="w-full mb-2"
                        key={item.name}
                      >
                        <NavItem
                          href={item.href}
                          state={activeNavItem(item.href)}
                        >
                          {item.name}
                        </NavItem>
                      </div>
                    ))
                  }
                </motion.nav>
              )
              :
              null
            }
          </div>
        </div>
        <motion.div
          className="relative top-8 opacity-0 hidden sm:block"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo/>
        </motion.div>
      </header>
    </>
  )
}
