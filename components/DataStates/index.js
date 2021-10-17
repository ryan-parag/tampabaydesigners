import React from 'react'
import { Frown, Loader } from 'react-feather'
import { motion } from 'framer-motion'

const Container = ({children}) => {
  return(
    <motion.div
      className="my-4 opacity-0 flex text-center flex-col items-center px-4 py-6 rounded bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 text-black dark:text-white text-opacity-50 dark:text-opacity-50"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24 }}
    >
      { children}
    </motion.div>
  )
}

export const Error = () => {
  return(
    <Container>
      <h2
        className="mb-4"
      >
        <Frown
          size={'32'}
        />
      </h2>
      <span>Oops - something went wrong</span>
    </Container>
  )
}

export const Empty = ({ children }) => {
  return(
    <Container>
      <h2
        className="mb-4"
      >
        <Frown
          size={'32'}
        />
      </h2>
      {children}
    </Container>
  )
}

export const Loading = () => {
  return(
    <Container>
      <h2
        className="mb-4"
      >
        <Loader
          size={'32'}
          className="animate-spin"
        />
      </h2>
      <span>Loading...</span>
    </Container>
  )
}