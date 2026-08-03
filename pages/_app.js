import '../styles/tailwind.css';
import '../styles/utils.css';
import '../styles/index.css';
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0';
import { MotionConfig } from 'framer-motion'

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </UserProvider>
  )
}