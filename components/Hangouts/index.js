import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '@components/FadeIn'
import Box, { BoxLink } from '@components/Box'
import { Check, MapPin, Clock } from 'react-feather'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event } from '@components/ListItem'
import Tag from '@components/Tag'
import { GroupLogo } from '@components/Logo'

export const LatestHangout = () => {

  const { data, error } = useSWR('/api/latest-hangout', fetcher);

  // While loading, render nothing; on error or no upcoming hangout, fall
  // back to the evergreen "first Thursday" card so the slot never vanishes.
  if (!data && !error) return null

  return(
    <FadeIn delay={0.24} className="relative">
      {
        data && data.latest.upcoming ? (
          <Event data={data.latest}/>
        )
        :
        (
          <BoxLink href={'/hangouts'} title={'Design Hangout - first Thursday of every month'} mt={'0'} mb={'0'}>
            <div className="flex items-start pt-10 md:pt-0">
              <div className="md:hidden absolute top-0 right-0 left-0 w-full flex justify-between items-center py-2 px-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                <div className="text-xs font-semibold uppercase font-mono tracking-widest">
                  <Tag color={'green'}><span className="font-bold font-mono leading-tight">Thu</span></Tag>
                  <span className="mx-2 opacity-50">/</span>
                  First Thursday
                </div>
                <Tag><span className="font-bold font-mono leading-tight">Monthly</span></Tag>
              </div>
              <motion.div
                className="h-32 w-32 absolute -right-16 top-1/2 transform -translate-y-1/2 opacity-0 blur-lg rotate-6"
                animate={{ opacity: .10 }}
                transition={{ duration: .75, delay: 0.3 }}
              >
                <GroupLogo group={'Tampa Bay Designers'}/>
              </motion.div>
              <div className="hidden md:inline-flex relative items-start flex-col py-1 px-0 w-20">
                <div className="relative z-10 rounded-lg text-center bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm overflow-hidden shadow flex flex-col w-full">
                  <div className="text-xs font-semibold py-1 bg-red-500 uppercase text-white font-mono tracking-widest">Thu</div>
                  <div className="text-lg md:text-2xl py-1">🎉</div>
                  <div className="text-xs pb-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50 font-mono">Monthly</div>
                </div>
                <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
                <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
              </div>
              <div className="pl-0 md:pl-4 flex-1">
                <div className="mb-2 flex-col flex items-start">
                  <h4>Meet designers in the area!</h4>
                  <div className="my-2 flex flex-col text-left">
                    <div className="text-sm items-start hidden md:inline-flex mb-2">
                      <Clock size={'16'} className="mr-2 mt-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50"/>
                      <div>First Thursday of every month</div>
                    </div>
                    <div className="text-sm inline-flex items-center">
                      <MapPin size={'16'} className="mr-2 text-black text-opacity-50 dark:text-white dark:text-opacity-50"/>
                      <span>Around the Tampa/St. Pete area</span>
                    </div>
                  </div>
                  <div className="text-sm mb-2 text-black text-opacity-50 dark:text-white dark:text-opacity-50">
                    Join your fellow designers as we grab some drinks, talk shop, or whatever else comes to mind.
                  </div>
                  <small className="inline-flex items-center">
                    Hosted by
                    <div className="inline-flex items-center ml-2">
                      <div className="h-6 w-6 mr-2">
                        <GroupLogo group={'Tampa Bay Designers'}/>
                      </div>
                      <strong>Tampa Bay Designers</strong>
                    </div>
                  </small>
                </div>
              </div>
            </div>
          </BoxLink>
        )
      }
    </FadeIn>
  )
}

// Shared email-capture form behind SignUp and Form, which differ only in
// heading, outer padding, success copy, and whether the upcoming event shows.
const EmailSignup = ({ header, beforeInput, afterInput, successMessage, padded }) => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null) // 'invalid' | 'failed'

  const sendContact = async () => {

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('invalid')
      return
    }

    setError(null)
    setSending(true)

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({ contact: { email } }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!res.ok) {
        throw new Error('Request failed')
      }

      // Only confirm success (and clear the field) once the request lands.
      setSent(true)
      setEmail('')
    } catch (e) {
      setError('failed')
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setSent(false)
  }

  return(
    <>
      {
        !sent ? (
          <FadeIn
            delay={0.3}
            className={`relative w-full text-center flex h-full flex-col justify-center items-center ${padded ? 'py-16 lg:py-24 ' : ''}overflow-visible`}
          >
            {header}
            <div
              className="py-4 lg:py-8 lg:px-8 w-full relative overflow-visible"
            >
              {beforeInput}
              <div className="relative z-10 flex w-full shadow-lg overflow-visible">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="block border border-transparent transition w-full rounded-lg p-6 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 backdrop-blur-md focus:bg-opacity-100 dark:focus:bg-opacity-100 focus:outline-none focus:border-black focus:border-opacity-20 dark:focus:border-white dark:focus:border-opacity-20"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {
                  email.length > 0 && (
                    <motion.button
                      className="px-6 rounded-r-lg absolute right-0 top-0 bottom-0 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 text-black text-opacity-70 h-full text-shadow disabled:opacity-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      disabled={sending}
                      onClick={() => sendContact()}
                    >
                      { sending ? 'Signing up...' : 'Sign Up' }
                    </motion.button>
                  )
                }
              </div>
              {
                error === 'invalid' && (
                  <div className="text-sm mt-2 text-red-500">Please enter a valid email address, like you@example.com</div>
                )
              }
              {
                error === 'failed' && (
                  <div className="text-sm mt-2 text-red-500">We couldn't sign you up just now - please try again</div>
                )
              }
              <motion.div
                className="overflow-visible filter blur-3xl bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 absolute top-0 bottom-0 right-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: .3 }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
              {afterInput}
            </div>
          </FadeIn>
        )
        :
        <>
          <FadeIn
            className="relative w-full text-center flex h-full flex-col justify-center items-center py-16 lg:py-24 px-4"
          >
            <Box>
              <h1 className="flex justify-center text-green-500 mt-0 mb-4">
                <Check size={32}/>
              </h1>
              <p>{successMessage}</p>
              <button className="button" onClick={() => reset()}>Close</button>
            </Box>
          </FadeIn>
        </>
      }
    </>
  )
}

export const SignUp = () => (
  <EmailSignup
    beforeInput={<span className="text-sm block mb-2">Subscribe to the Design Hangout calendar:</span>}
    successMessage={"Thanks! We'll add you to the list."}
  />
)

export const Form = () => {

  const { data } = useSWR('/api/latest-hangout', fetcher);

  return(
    <EmailSignup
      padded
      header={
        <>
          <span className="uppercase text-xs tracking-widest">🙏 Please join us</span>
          <h3 className="text-black dark:text-white mt-4 mb-0">Sign up to be notified about the next hangout</h3>
        </>
      }
      afterInput={
        data && data.latest.upcoming ? (
          <div className="text-left mt-4">
            <Event data={data.latest}/>
          </div>
        ) : null
      }
      successMessage={"Thanks! We'll let you know when the next one is scheduled"}
    />
  )
}