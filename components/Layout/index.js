import Head from 'next/head'
import { Normalize } from 'styled-normalize'
import Header from '@components/Header'
import Footer from '@components/Footer'
import ReactGA from 'react-ga'

export default function Layout({ children, pageTitle, description, ogImage, ...props }) {
  
  if (typeof window !== "undefined") {
    ReactGA.initialize('UA-157497184-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="Description" content={description}></meta>
        <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Forum&family=Work+Sans:wght@300;400;700&display=swap" rel="stylesheet"/>
        <title>{pageTitle}</title>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={pageTitle}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={`https://tampabay.design${ogImage}`}></meta>
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
      <>
        <Header />
        {children}
        <Footer/>
      </>
    </>
  )
}