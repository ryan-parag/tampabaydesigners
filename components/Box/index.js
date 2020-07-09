import styled, { css } from 'styled-components'

export const Box = css`
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  border-radius: ${({ theme }) => theme.space[2]};
  flex-direction: column;
  align-items: center;
  background: var(--gray100);
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
    background: var(--gray200);
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