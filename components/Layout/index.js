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
          <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"></link>
          <title>{pageTitle}</title>
          <meta property="og:type" content="website"></meta>
          <meta property="og:title" content={pageTitle}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content="/tbd-sm.png"></meta>
          <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"></link>
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"></link>
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"></link>
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"></link>
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"></link>
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"></link>
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"></link>
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"></link>
          <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
          <link rel="manifest" href="/favicon/manifest.json"></link>
          <meta name="msapplication-TileColor" content="#ffffff"></meta>
          <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png"></meta>
          <meta name="theme-color" content="#ffffff"></meta>
          <link rel="mask-icon" href="/favicon/notes-favicon.svg" color="#E67D01"></link>
          <link rel="icon" href="/favicon/tbd.svg"></link>
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
