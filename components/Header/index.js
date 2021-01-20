import Logo from '@components/Logo'
import NavItem from '@components/NavItem'
import { motion } from 'framer-motion'

export default function Header() {

  return (
    <>
      <header className="flex flex-col items-center w-full mb-4">
        <div className="flex justify-center shadow bg-white dark:bg-white dark:bg-opacity-5 w-full mb-8">
          <nav className="block w-full sm:w-3/4 md:w-1/2 p-2" role="navigation" aria-label="main navigation">
            <NavItem href="/">
              Home
            </NavItem>
            <NavItem href="/slack">
              Slack
            </NavItem>
            <NavItem href="/events">
              Events
            </NavItem>
            <NavItem href="/about">
              About
            </NavItem>
          </nav>
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
