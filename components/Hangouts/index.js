import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Box, { BoxLink } from '@components/Box'
import { Check } from 'react-feather'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event } from '@components/ListItem'
import { Avatar } from '@components/PageIcon'

export const LatestHangout = () => {

  const { data, error } = useSWR('/api/latest-hangout', fetcher);

  return(
    <>
      {
        data && (
          <motion.div
            className="relative opacity-0 top-4"
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.24 }}
          >
            {
              data.latest.upcoming ? (
                <>
                  <Event data={data.latest}/>
                </>
              )
              :
              (
                <BoxLink href={'hangouts'} mt={'0'} mb={'0'} p={'0'} tint={'green'}>
                  <div
                    className="flex flex-row w-full px-4 py-6 rounded backdrop-filter backdrop-blur-2xl dark:bg-green-900 dark:bg-opacity-30 bg-green-100 bg-opacity-80"
                  >
                    <Avatar type={'🎉'} mt={'3'} />
                    <div className="flex-1 pl-4">
                      <h4 className="mt-2 mb-2">Meet designers in the area!</h4>
                      <p className="text-xs md:text-sm mb-4 mt-0">Let's get together on the first Tuesday of every month somewhere around the Tampa/St. Pete area - join your fellow designers as we grab some drinks, talk shop, or whatever else comes to mind.</p>
                    </div>
                  </div>
                </BoxLink>
              )
            }
          </motion.div>
        )
      }
    </>
  )
}

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const sendContact = async () => {

    if(email.includes('@')) {
      const contact = {
        email: email
      }
  
      setSent(true)
      setEmailError(false)
  
      const response = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({ contact }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
    } else {
      setEmailError(true)
    }
  }

  const reset = () => {
    setSent(false)
    setEmail('')
  }

  return(
    <>
      {
        !sent ? (
          <motion.div
            className="relative top-4 opacity-0 w-full text-center flex h-full flex-col justify-center items-center overflow-visible"
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              className="py-4 lg:py-8 lg:px-8 w-full relative overflow-visible"
            >
              <span className="text-sm block mb-2">Subscribe to the Design Hangout calendar:</span>
              <div className="relative z-10 flex w-full shadow-lg overflow-visible">
                <input
                  type="text"
                  placeholder="Enter email..."
                  className="block border border-transparent transition w-full rounded-lg bg-transparent p-6 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 backdrop-blur-md focus:bg-opacity-100 dark:focus:bg-opacity-100 focus:outline-none focus:border-black focus:border-opacity-20 dark:focus:border-white dark:focus:border-opacity-20"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {
                  email.length > 0 && (
                    <motion.button
                      className="px-6 rounded-r-lg absolute right-0 top-0 bottom-0 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 text-black text-opacity-70 h-full opacity-0 text-shadow"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => sendContact()}
                    >
                      Sign Up
                    </motion.button>
                  )
                }
              </div>
              {
                emailError && (
                  <div className="text-sm mt-2 text-red-500">Something is wrong with your email address</div>
                )
              }
              <motion.div
                className="overflow-visible opacity-0 filter blur-3xl bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 absolute top-0 bottom-0 right-0 left-0"
                animate={{ opacity: .3 }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
            </div>
          </motion.div>
        )
        :
        <>
          <motion.div
            className="relative top-4 opacity-0 w-full text-center flex h-full flex-col justify-center items-center py-16 lg:py-24 px-4"
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <h1 className="flex justify-center text-green-500 mt-0 mb-4">
                <Check size={32}/>
              </h1>
              <p>Thanks! We'll add you to the list.</p>
              <button className="button" onClick={() => reset()}>Close</button>
            </Box>
          </motion.div>
        </>
      }
    </>
  )
}

export const Form = () => {

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const sendContact = async () => {

    if(email.includes('@')) {
      const contact = {
        email: email
      }
  
      setSent(true)
      setEmailError(false)
  
      const response = await fetch('api/contacts', {
        method: 'POST',
        body: JSON.stringify({ contact }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
  
      setEmail('')
    } else {
      setEmailError(true)
    }
  }

  const reset = () => {
    setSent(false)
  }

  const { data, error } = useSWR('/api/latest-hangout', fetcher);

  return(
    <>
      {
        !sent ? (
          <motion.div
            className="relative top-4 opacity-0 w-full text-center flex h-full flex-col justify-center items-center py-16 lg:py-24 overflow-visible"
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="uppercase text-xs tracking-widest">🙏 Please join us</span>
            <h3 className="text-black dark:text-white mt-4 mb-0">Sign up to be notified about the next hangout</h3>
            <div
              className="py-4 lg:py-8 lg:px-8 w-full relative overflow-visible"
            >
              <div className="relative z-10 flex w-full shadow-lg overflow-visible">
                <input
                  type="text"
                  placeholder="Enter email..."
                  className="block border border-transparent transition w-full rounded-lg bg-transparent p-6 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 backdrop-blur-md focus:bg-opacity-100 dark:focus:bg-opacity-100 focus:outline-none focus:border-black focus:border-opacity-20 dark:focus:border-white dark:focus:border-opacity-20"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {
                  email.length > 0 && (
                    <motion.button
                      className="px-6 rounded-r-lg absolute right-0 top-0 bottom-0 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 text-black text-opacity-70 h-full opacity-0 text-shadow"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => sendContact()}
                    >
                      Sign Up
                    </motion.button>
                  )
                }
              </div>
              {
                emailError && (
                  <div className="text-sm mt-2 text-red-500">Something is wrong with your email address</div>
                )
              }
              <motion.div
                className="overflow-visible opacity-0 filter blur-3xl bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 absolute top-0 bottom-0 right-0 left-0"
                animate={{ opacity: .3 }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
              {
                data && (
                  <>
                    {
                      data.latest.upcoming && (
                        <div className="text-left mt-4">
                          <Event data={data.latest}/>
                        </div>
                      )
                      
                    }
                  </>
                )
              }
            </div>
          </motion.div>
        )
        :
        <>
          <motion.div
            className="relative top-4 opacity-0 w-full text-center flex h-full flex-col justify-center items-center py-16 lg:py-24 px-4"
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <h1 className="flex justify-center text-green-500 mt-0 mb-4">
                <Check size={32}/>
              </h1>
              <p>Thanks! We'll let you know when the next one is scheduled</p>
              <button className="button" onClick={() => reset()}>Close</button>
            </Box>
          </motion.div>
        </>
      }
    </>
  )
}