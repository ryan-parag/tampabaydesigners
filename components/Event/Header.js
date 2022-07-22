import React, { useState, useEffect } from 'react'
import AddToCalendar from './AddToCalendar'
import { Check } from 'react-feather'
import moment from 'moment'
import { motion } from 'framer-motion'
import { GroupLogo } from '@components/Logo'

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
    <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-50 w-full border-b border-gray-400 border-opacity-10 dark:border-gray-400 dark:border-opacity-10 shadow-lg">
      <div className="container px-3 py-8 mx-auto lg:w-1/2 flex">
        <div className="flex-1 pr-4">
          <span className="text-xs lg:text-sm">{moment(event.date).format('LLLL')}</span>
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
              <strong className="ml-2">{event.org}</strong>
            </div>
          </motion.div>
        </div>
      </div>
      <div className={`container px-3 pb-8 mx-auto lg:w-1/2 grid grid-cols-2 gap-4`}>
        {
          event.link.includes('tampabay.design') ? (
            <AddToCalendar
              name={event.name}
              description={event.description}
              location={event.location}
              dateTime={event.date}
            />
          )
          :
          (
            <a href={event.link} target="_blank" rel="noreferrer" className="button button--primary my-0">Attend</a>
          )
        }
        {
          copy ? (
            <div className="text-center px-4 cursor-pointer py-3 my-0 inline-flex justify-center items-center border border-transparent">
              <Check size={'16'} className="text-green-500 mr-2"/>
              Copied
            </div>
          )
          :
          (
            <button onClick={() => copyLink(`https://tampabay.design/events/${event.id}`)} className="button my-0">Copy Link</button>
          )
        }
      </div>
    </div>
  )
}

export default Header