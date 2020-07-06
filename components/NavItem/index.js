import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavItem = styled.div`
  display: inline-block;
  text-align: center;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  color: var(--gray600);
  border-bottom: ${({ theme }) => theme.space[1]} solid transparent;
  min-width: ${({ theme }) => theme.space[9]};
  transition: all 120ms ease-out 0s;
  &:hover, &:focus {
    border-color: var(--gray200);
    color: var(--gray700);
  }
  &.active {
    border-color: var(--orange);
    color: var(--gray900);
  }
`

export default ({ href, children }) => {
  const router = useRouter()

  let isActive = null
  if(router.pathname === '/' && router.pathname === href) {
    isActive = `active`
  } else if (href !== '/' && router.pathname.includes(href)) {
    isActive = `active`
  }

  return (
    <Link href={href}>
      <a>
        <NavItem className={isActive}>
          {children}
        </NavItem>
      </a>
    </Link>
  )
}