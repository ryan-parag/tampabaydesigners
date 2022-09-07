import React, { useState, useEffect } from 'react'
import Attend from './Attend'
import { Check } from 'react-feather'
import moment from 'moment'
import { motion } from 'framer-motion'
import { GroupLogo } from '@components/Logo'
import { CalendarMobile } from './CalendarItem'
import Avatar from '@components/Avatar'

const Header = ({ event }) => {

  const [copy, setCopy] = useState(false)

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const copyLink = (string) => {
    copyTextToClipboard(string)
    .then(() => {
      setCopy(true)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  },[copy])

  return(
    <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-70 w-full border-b border-gray-400 border-opacity-10 dark:border-gray-400 dark:border-opacity-10 shadow-lg relative">
      <div className="w-full md:hidden">
        <CalendarMobile
          date={event.date}
          time={moment(event.date).format('LT')}
          diff={event.diff}
          padding={'3'}
        />
      </div>
      <div className="container px-3 pb-8 pt-12 md:pt-8 mx-auto lg:w-1/2 flex">
        <div className="flex-1 pr-4">
          <span className="text-xs lg:text-sm hidden md:block">{moment(event.date).format('LLLL')}</span>
          <h1 className="my-3 text-2xl lg:text-4xl">{event.name}</h1>
          <motion.div
            className="relative flex items-center opacity-0"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>
              Hosted by
            </span>
            <div className="inline-flex items-center ml-2 dark:text-white text-black">
              <div className="h-6 w-6">
                <GroupLogo group={event.org}/>
              </div>
              <strong className="mx-2">{event.org}</strong>
              {
                copy ? (
                  <div className="cursor-pointer inline-flex justify-center items-center text-sm">
                    <Check size={'16'} className="text-green-500 mr-2"/>
                    Copied
                  </div>
                )
                :
                (
                  <button onClick={() => copyLink(`https://tampabay.design/events/${event.id}`)} className="underline text-sm">Copy Link</button>
                )
              }
            </div>
          </motion.div>
        </div>
      </div>
      <>
        {
          event.diff && event.diff >= 0 && (
            <>
              {
                event.link.includes('tampabay.design') ? (
                  <div className={`container px-3 pb-8 mx-auto lg:w-1/2 grid grid-cols-1 xl:grid-cols-3 gap-y-6 lg:gap-x-6`}>
                    <div className="col-span-2">
                      {
                        event.attending.length > 0 ? (
                          <div className="flex w-full items-center">
                            <span className="text-3xl">🎉</span>
                            <div className="pl-2 flex-1 w-full mt-2 leading-relaxed">
                              Join&nbsp;
                              <strong>
                                {
                                  event.attending.slice(0, 3).join(', ')
                                }
                                {
                                  event.attending.length >= 4 && (
                                    <>
                                      &nbsp;and {event.attending.length - 3} more
                                    </>
                                  )
                                }
                              </strong>
                              &nbsp;at this event
                            </div>
                          </div>
                        )
                        :
                        (
                          <span className="opacity-50">Be the first to sign up for attendance!</span>
                        )
                      }
                    </div>
                    <Attend
                      event={event}
                    />
                  </div>
                )
                :
                (
                  <div className={`container px-3 pb-8 mx-auto lg:w-1/2 grid grid-cols-1 gap-4`}>
                    <a href={event.link} target="_blank" className="button my-0 button-primary">Attend</a>
                  </div>
                )
              }
            </>
          )
        }
      </>
    </div>
  )
}

export default Header