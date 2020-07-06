import Head from 'next/head'
import { Normalize } from 'styled-normalize'
import Header from '@components/Header'
import { GlobalStyle } from '@components/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { theme } from '@components/Theme'

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
          <div>{children}</div>
        </section>
        <footer>
          Built with <img src="/netliheart.svg" alt="Netlify Heart" /> for you
        </footer>
      </ThemeProvider>
    </>
  )
}
