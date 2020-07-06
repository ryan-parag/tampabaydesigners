import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  padding: ${({ theme }) => theme.space[3]};
  text-align: center;
  color: var(--gray600);
`

export default function Footer() {
  return(
    <FooterContainer>
      Made with Next.js, Styled Components, and Netlify
      <br/>
      <a href="https://github.com/TampaBayDesigners/tampabaydesigners" target="_blank">Contribute on GitHub</a>
    </FooterContainer>
  )
}