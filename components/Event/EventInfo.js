import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'react-feather'
import Box from '@components/Box'

const EventInfo = ({ date, location }) => {

  const { data, error } = useSWR(`/api/hangout-locations/${location}`, fetcher);

  return(
    <div className="grid grid-cols-1">
      <Box mt={'0'}>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center mb-2 text-black text-opacity-60 dark:text-white dark:text-opacity-50">
            <span className="pr-2 mt-0 mb-0 text-sm">Date and time</span>
            <Clock size={'16'}/>
          </div>
          <p className="text-sm my-0">{date}</p>
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
                      <a className="block text-xs mt-2 underline" href={`https://maps.google.com/?q=${data.item.name}`} target="_blank" rel="noreferrer">View on Map</a>
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