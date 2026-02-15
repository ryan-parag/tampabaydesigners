import React from 'react'
import Logo from '@components/Logo'
import Link from 'next/link'

const Footer = () => {

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
    }, {
      name: 'About',
      link: '/about'
    }, {
      name: 'Generate Event Images',
      link: 'https://tbd-image-gen.vercel.app',
      external: true
    }
  ]

  return (
    <footer className="border-t border-gray-500 border-opacity-10 dark:bg-gray-600 dark:bg-opacity-10 dark:border-gray-700 dark:border-opacity-30 px-4 py-16">
      <div className="flex flex-col items-center">
        <Logo small mono />
        <ul className="flex flex-wrap py-4 px-4 justify-center">
          {
            navItems.map((item, i) => (
              <li
                key={i}
                className="my-2"
              >
                {item.external ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="my-1 inline-flex transition text-black dark:text-white text-opacity-50 dark:text-opacity-50 hover:text-opacity-100 dark:hover:text-opacity-100 py-1 px-3 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-full mx-2">
                    { item.name }
                  </a>
                ) : (
                  <Link href={item.link}>
                    <a className="my-1 inline-flex transition text-black dark:text-white text-opacity-50 dark:text-opacity-50 hover:text-opacity-100 dark:hover:text-opacity-100 py-1 px-3 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-full mx-2">
                      { item.name }
                    </a>
                  </Link>
                )}
              </li>
            ))
          }
        </ul>
        <a
          href="https://github.com/srhzt/tampabaydesigners"
          target="_blank"
          className="button"
        >
          Contribute on GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer