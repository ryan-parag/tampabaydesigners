import React, { useState } from 'react'
import Logo from '@components/Logo'
import NavItem from '@components/NavItem'
import { motion } from 'framer-motion'
import { Menu, X } from 'react-feather'

export default function Header() {

  const [open, setOpen] = useState(false)

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
      name: 'About',
      href: '/about'
    },{
      name: 'Links',
      href: '/links'
    }
  ]

  return (
    <>
      <header className="flex flex-col items-center w-full mb-4">
        <div className="flex justify-center shadow bg-white dark:bg-black border-b-2 border-gray-100 dark:border-white dark:border-opacity-10 w-full mb-8">
          <nav className="hidden sm:block w-full sm:w-3/4 md:w-1/2 p-2" role="navigation" aria-label="main navigation">
            {
              navigation.map(item => (
                <div
                  className="w-1/5 pl-1 pr-1 inline-block"
                  key={item.name}
                >
                  <NavItem
                    href={item.href}
                    center
                  >
                    {item.name}
                  </NavItem>
                </div>
              ))
            }
          </nav>
          <div className="w-full block sm:hidden">
            <div className="p-2 flex sm:hidden w-full justify-start">
              <button onClick={() => setOpen(!open)} className="p-4 rounded-full bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 focus:outline-none">
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
          className="relative top-8 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo/>
        </motion.div>
      </header>
    </>
  )
}
