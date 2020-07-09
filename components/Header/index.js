import Link from 'next/link'
import Logo from '@components/Logo'
import styled from 'styled-components'
import NavItem from '@components/NavItem'

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space[3]} 0 0;
  width: 100%;
  background: var(--gray900);
  margin-bottom: ${({ theme }) => theme.space[3]};
`

const Nav = styled.nav`
  display: block;
  background: var(--white);
  width: 100%;
  text-align: center;
  box-shadow: 0px 1px 2px rgba(0,0,0,.2);
  margin-top: ${({ theme }) => theme.space[3]};
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

export default function Header() {

  return (
    <>
      <HeaderContainer>
        <Logo/>
        <Nav role="navigation" aria-label="main navigation">
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
        </Nav>
      </HeaderContainer>
    </>
  )
}
