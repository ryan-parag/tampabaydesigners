import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FadeIn from '@components/FadeIn'
import Box from '@components/Box'
import { Check } from 'react-feather'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event } from '@components/ListItem'
import { Loading } from '@components/DataStates'
import Tag from '@components/Tag'
import { formatDateParts } from '@utils/date'
import moment from 'moment'

const withinNextDays = (item, days) => item && item.diff >= 0 && item.diff <= days

// Single-line rows for the next hangout and next cowork, each only shown if
// it falls within the next 30 days - skipped entirely otherwise.
export const NextEvent = () => {

  const { data, error } = useSWR('/api/next-events', fetcher);

  if (!data && !error) {
    return (
      <div className="mt-4">
        <Loading />
      </div>
    )
  }

  if (!data) return null

  const items = [data.hangout, data.cowork]
    .filter(item => withinNextDays(item, 30))
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (items.length === 0) return null

  return(
    <FadeIn delay={0.24} className="my-4 mx-4 border border-black/10 dark:border-white/10 rounded divide-y divide-black divide-opacity-10 dark:divide-white dark:divide-opacity-10 bg-white/30 dark:bg-black/30">
      <div className="text-xs py-2 px-4">In the next 30 days...</div>
      {
        items.map(item => (
          <Link
            key={item.id}
            href={`/events/${item.id}`}
            className={`flex flex-col md:flex-row items-start md:items-center text-left justify-between px-4 py-3 text-sm transition opacity-90 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 gap-2 group ${item.id === items[0].id && 'font-bold'}`}
          >
            <span className="inline-flex text-left flex-col md:flex-row items-start md:items-center min-w-0 gap-2">
              <Tag color={item.type === 'hangout' ? 'blue' : 'green'}>
                <span className="font-bold font-mono leading-tight whitespace-nowrap group-hover:scale-105 transition">
                  { item.type === 'hangout' ? 'Hangout' : 'Cowork' }
                </span>
              </Tag>
              <span className="min-w-0 truncate">{item.locationName}</span>
            </span>
              <div className="inline-flex items-center gap-2">
                {
                  items[0].id === item.id && (<span className="uppercase text-[10px] tracking-wider font-bold py-0 px-2 rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-500/20">{moment(item.date).fromNow()}</span>)
                }
                <span className="whitespace-nowrap text-xs font-mono text-black text-opacity-50 dark:text-white dark:text-opacity-50">
                  {formatDateParts(item.date).monthString} {formatDateParts(item.date).numString} · {formatDateParts(item.date).timeString}
                </span>
              </div>
          </Link>
        ))
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

  const { data, error } = useSWR('/api/latest-hangout', fetcher);

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
        !data && !error ? (
          <div className="mt-4">
            <Loading />
          </div>
        ) : data && data.latest && data.latest.upcoming ? (
          <div className="text-left mt-4">
            <Event data={data.latest}/>
          </div>
        ) : null
      }
      successMessage={"Thanks! We'll let you know when the next one is scheduled"}
    />
  )
}