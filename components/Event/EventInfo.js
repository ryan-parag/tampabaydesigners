import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'react-feather'
import Box from '@components/Box'
import AddToCalendar from './AddToCalendar';

const EventInfo = ({ event, date, location, diff }) => {

  const { data, error } = useSWR(`/api/hangout-locations/${location}`, fetcher);

  return(
    <div className="grid grid-cols-1">
      <Box mt={'0'}>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {
            diff && diff >= 0 && diff <= 7 ? (
              <span className="mb-2 flex items-center w-full text-sm font-semibold text-yellow-700 dark:text-yellow-500">Starts in {diff} day{diff !== 1 && 's'} 🎉</span>
            )
            :
            null
          }
          {
            diff && diff < 0 ? (
              <span className="mb-2 flex items-center w-full text-sm font-semibold text-red-700 dark:text-red-500">This event already took place</span>
            )
            :
            null
          }
          <div className="flex items-center mb-2 text-black text-opacity-60 dark:text-white dark:text-opacity-50">
            <span className="pr-2 mt-0 mb-0 text-sm">Date and time</span>
            <Clock size={'16'}/>
          </div>
          <p className="text-sm my-0">
            {date}
          </p>
          {
            event && diff && diff >= 0 ? (
              <div className="my-2">
                <AddToCalendar
                  name={event.name}
                  description={event.description}
                  location={event.location}
                  dateTime={event.date}
                />
              </div>
            )
            :
            null
          }
        </motion.div>
        <hr className="my-4 border-b border-gray-400 border-opacity-10 dark:border-gray-400 dark:border-opacity-10"/>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {
            data ? (
              <>
                <div className="flex items-center mb-2 text-black text-opacity-60 dark:text-white dark:text-opacity-50">
                  <span className="pr-2 mt-0 mb-0 text-sm">Location</span>
                  <MapPin size={'16'}/>
                </div>
                <div>
                  <p className="text-sm font-bold my-0">{data.item.name}</p>
                  <span className="text-xs">{data.item.address}</span>
                  {
                    data.item.name === 'TBA' ? (
                      <span className="block text-sm mt-2">Location TBA</span>
                    )
                    :
                    (
                      <div className="mt-2">
                        <a className="inline-block text-xs underline" href={`https://maps.google.com/?q=${data.item.name}`} target="_blank" rel="noreferrer">View on Map</a>
                      </div>
                    )
                  }
                </div>
              </>
            )
            :
            (
              <div className="px-2 pb-2">
                <span>Loading...</span>
              </div>
            )
          }
        </motion.div>
      </Box>
    </div>
  )
}

export default EventInfo