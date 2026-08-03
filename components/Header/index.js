import React, { useState } from 'react'
import Logo from '@components/Logo'
import Link from 'next/link'
import { Menu, X } from 'react-feather'
import FadeIn from '@components/FadeIn'
import { useRouter } from 'next/router'
import Profile from '@components/Profile'

const NavItem = ({ href, name, mobile, state }) => {

  const classes = `border-b-2 inline-flex p-4 transition text-black dark:text-white text-opacity-50 dark:text-opacity-50 hover:bg-yellow-500 hover:bg-opacity-10 dark:hover:bg-yellow-500 dark:hover:bg-opacity-10 hover:text-opacity-100 dark:hover:text-opacity-100 ${state === 'active' ? 'border-yellow-500 text-opacity-100 dark:text-opacity-100' : 'border-transparent'}`

  const mobileClasses = `block transition px-4 py-8 text-center text-2xl hover:bg-black hover:text-opacity-100 dark:hover:bg-white dark:hover:text-opacity-100 hover:bg-opacity-10 dark:hover:bg-opacity-10 ${state === 'active' ? 'text-yellow-700 dark:text-yellow-300' : 'text-black dark:text-white text-opacity-50 dark:text-opacity-50'}`

  return (
    <Link
      href={href}
      className={mobile ? mobileClasses : classes}>

      {name}

    </Link>
  );
}

const Header = () => {

  const router = useRouter()

  const navItems = [
    {
      name: 'Groups',
      link: '/groups'
    }, {
      name: 'Slack',
      link: '/slack'
    }, {
      name: 'Events',
      link: '/events'
    }, {
      name: 'Hangouts',
      link: '/hangouts'
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
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex md:hidden transition dark:hover:bg-black hover:bg-gray-100 text-black dark:text-white hover:text-opacity-100 dark:hover:text-opacity-100 text-opacity-50 dark:text-opacity-50 rounded-full p-2"
            onClick={() => setOpen(true)}
          >
            <Menu size={20}/>
          </button>
          <Logo small />
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
            <li className="px-2 inline-flex items-center">
              <Profile sm/>
            </li>
          </ul>
          <div className="inline-block md:hidden">
            <Profile sm/>
          </div>
        </div>
      </div>
      {
        open && (
          <div className="fixed backdrop-filter backdrop-blur-2xl bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-70 top-0 bottom-0 right-0 left-0 z-40">
            <div className="flex justify-between px-4 py-2">
              <button
                aria-label="Close menu"
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
            <ul className="pt-20 flex flex-col">
              {
                navItems.map((item, i) => (
                  <FadeIn
                    as={'li'}
                    className="block"
                    key={i}
                    delay={0.05*i}
                  >
                    <NavItem
                      mobile
                      name={item.name}
                      href={item.link}
                      state={activeNavItem(item.link)}
                    />
                  </FadeIn>
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