import styled, { css } from 'styled-components'

export const Box = css`
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  border-radius: ${({ theme }) => theme.space[2]};
  flex-direction: column;
  align-items: center;
  background: var(--white);
  border: 1px solid var(--gray300);
  text-align: center;
  color: inherit;
  text-decoration: none;
`

export const BoxLink = styled.a`
  ${Box}
  transition: all 120ms ease-out 0s;
  &:visited {
    color: inherit;
  }
  &:hover, &:focus {
    background: var(--gray100);
    border-color: var(--gray400);
    outline: none;
    color: inherit;
  }
  &:focus {
    border-color: var(--orange);
  }
  &:active {
    border-color: var(--gray400);
    color: var(--gray700);
    box-shadow: inset 0px 0px ${({ theme }) => theme.space[3]} var(--gray400);
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[4]}) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`

export const BoxNew = (props) => {

  const defaultClasses = "border border-gray-200 bg-gray-100 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10"
  const transparentClasses = "bg-gray-100 dark:bg-transparent border border-gray-200 dark:border-white dark:border-opacity-20"

  const errorClasses = "bg-red-100 dark:bg-red-500 dark:bg-opacity-20 border border-red-500 border-opacity-20"

  return(
    <div
      className={`${props.center ? 'text-center' : 'text-left'} ${props.flex ? 'flex' : 'block'} ${props.marginBottom ? 'mb-' + props.marginBottom : 'mb-0'} ${props.marginTop ? 'mt-' + props.marginTop : 'mt-0'} ${props.paddingAll ? 'p-' + props.paddingAll : 'p-4'} rounded-md ${props.transparent ? transparentClasses : props.state === 'error' ? errorClasses : defaultClasses}`}
    >
      {props.children}
    </div>
  )
}

export const BoxOutbound = (props) => {

  const defaultClasses = "transition rounded-md border border-gray-200 dark:border-white dark:border-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 shadow hover:shadow-lg dark:hover:border-transparent"

  return(
    <a
      className={`${props.center ? 'text-center' : 'text-left'} ${props.flex ? 'flex' : 'block'} ${props.marginBottom ? 'mb-' + props.marginBottom : 'mb-0'} ${props.marginTop ? 'mt-' + props.marginTop : 'mt-0'} ${props.padding ? 'p-' + props.padding : 'p-4'} rounded-md ${defaultClasses}`}
      href={props.href}
      target="_blank"
    >
      {props.children}
    </a>
  )
}