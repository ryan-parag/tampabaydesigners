import React from 'react'
import { Frown, Loader } from 'react-feather'
import FadeIn from '@components/FadeIn'

const Container = ({children}) => {
  return(
    <FadeIn className="my-4 flex text-center flex-col items-center px-4 py-6 rounded-lg bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 text-black dark:text-white text-opacity-50 dark:text-opacity-50">
      { children }
    </FadeIn>
  )
}

export const Error = ({ onRetry, children }) => {
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
      {
        (onRetry || children) && (
          <div className="flex flex-wrap items-center justify-center mt-2">
            {
              onRetry && (
                <button className="button mx-2" onClick={onRetry}>
                  Try again
                </button>
              )
            }
            { children }
          </div>
        )
      }
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
