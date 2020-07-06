import Head from 'next/head'
import { Normalize } from 'styled-normalize'
import Header from '@components/Header'
import { GlobalStyle } from '@components/GlobalStyles'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '@components/Theme'
import Footer from '@components/Footer'

const Main = styled.main`
width: 100%;
padding: ${({ theme }) => theme.space[3]};
max-width: ${({ theme }) => theme.layoutWidth};
margin: auto;
`

export default function Layout({ children, pageTitle, description, ...props }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="Description" content={description}></meta>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"></link>
          <title>{pageTitle}</title>
        </Head>
        <Normalize />
        <section>
          <Header />
          <Main>
            {children}
          </Main>
          <Footer/>
        </section>
      </ThemeProvider>
    </>
  )
}
