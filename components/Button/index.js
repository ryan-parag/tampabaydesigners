import styled, { css } from 'styled-components'

export const ButtonBase = css`
  font-family: inherit;
  border: 0;
  display: inline-block;
  padding: ${({ theme}) => theme.space[2]} ${({ theme}) => theme.space[4]};
  color: var(--blue);
  border-radius: ${({ theme}) => theme.space[2]};
  font-size: ${({ theme}) => theme.fontSizes[2]};
  text-decoration: none;
  position: relative;
  transition: all 120ms ease-out 0s;
  .arrow {
    margin-left:${({ theme}) => theme.space[2]};
    display: inline-block;
    transition: all 120ms ease-out 0s;
    opacity: .5;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: ${({ theme}) => theme.space[2]};
    background: currentColor;
    opacity: .12;
    transition: all 120ms ease-out 0s;
  }
  &:hover, &:focus {
    color: var(--blue);
    &:after {
      opacity: .2;
    }
    .arrow {
      transform: translateX(${({ theme}) => theme.space[2]}) scale(1.1);
      opacity: 1;
    }
  }
  :visited {
    color: var(--purple);
  }
  &:focus {
    box-shadow: inset 0px 0px 0px 2px currentColor;
    outline: none;
  }
  &:active {
    box-shadow: inset 0px 0px ${({ theme}) => theme.space[2]} currentColor;
  }
`

export const ButtonLink = styled.a`
  ${ButtonBase}
`
export const Button = styled.button`
  ${ButtonBase}
`
