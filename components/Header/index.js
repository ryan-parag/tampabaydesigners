import Logo from '@components/Logo'
import NavItem from '@components/NavItem'

export default function Header() {

  return (
    <>
      <header className="flex flex-col items-center w-full mb-4">
        <div className="flex justify-center shadow bg-white dark:bg-white dark:bg-opacity-5 w-full mb-8">
          <nav className="block w-full sm:w-3/4 md:w-1/2 py-2" role="navigation" aria-label="main navigation">
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
        <Logo/>
      </header>
    </>
  )
}
