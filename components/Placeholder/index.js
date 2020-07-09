import React from 'react'
import styled from 'styled-components'

const PlaceholderContainer = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  text-align: center;
  background: var(--gray200);
  margin: ${({ theme}) => theme.space[3]} auto;
`

const PlaceholderIcon = styled.div`
  display: inline-block;
  width: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.space[6]};
  position: relative;
  color: var(--pink);
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    top: -${({ theme }) => theme.space[2]};
    bottom: -${({ theme }) => theme.space[2]};
    left: -${({ theme }) => theme.space[2]};
    right: -${({ theme }) => theme.space[2]};
    background: currentColor;
    opacity: .12;
    border-radius: 50%;
  }
`

export default function Placeholder(){
  return(
    <PlaceholderContainer>
      <PlaceholderIcon>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px" d='M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z'/>
          <polyline fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px" points='69 153.99 256 263.99 443 153.99'/>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px" x1='256' y1='463.99' x2='256' y2='263.99'/>
        </svg>
      </PlaceholderIcon>
      <h3>Placeholder content</h3>
      <p style={{ marginBottom: '0'}}>This section will be replaced with actual content</p>
    </PlaceholderContainer>
  )
}