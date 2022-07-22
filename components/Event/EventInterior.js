import React from 'react'
import { truncateString } from '@utils/text'
import { motion } from 'framer-motion'
import moment from 'moment'
import { GroupLogo } from '@components/Logo'
import { MapPin, Clock } from 'react-feather'
import CalendarItem, { CalendarMobile } from '@components/Event/CalendarItem'

const textTruncateLength = 120

const EventInterior = ({ data }) => {

  return(
    <div className="flex items-start pt-8 md:pt-0">
      <div className="block md:hidden">
        <CalendarMobile
          date={data.date}
          time={moment(data.date).format('LT')}
          diff={data.diff}
        />
      </div>
      <motion.div
        className="h-32 w-32 absolute -right-16 top-1/2 transform -translate-y-1/2 opacity-0 blur-lg rotate-6"
        animate={{ opacity: .10 }}
        transition={{ duration: .75, delay: 0.3 }}
      >
        <GroupLogo group={data.org}/>
      </motion.div>
      <div className="hidden md:inline-flex relative items-start flex-col py-1 px-0 w-20">
        <CalendarItem date={data.date} />
        <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
        <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
      </div>
      <div className="pl-0 md:pl-4 flex-1">
        <div className="mb-2 flex-col flex items-start">
          <h4>{data.upcoming && 'Upcoming - '}{data.name}</h4>
          <div className="my-2 flex flex-col text-left">
            <div className="text-sm items-start hidden md:inline-flex mb-2">
              <Clock size={'16'} className="mr-2 mt-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50"/>
              <div>
                <div>
                  {moment(data.date).format('dddd, MMMM D, YYYY')}
                  {
                    data.diff && data.diff !== 0 && data.diff < 7 ? (
                      <span className="ml-2 font-semibold text-yellow-700 dark:text-yellow-500">In {data.diff} Day{data.diff !== 1 && 's'}</span>
                    )
                    :
                    null
                  }
                </div>
                <div>
                  Starts at {moment(data.date).format('LT')}
                </div>
              </div>
            </div>
            <div className="text-sm inline-flex items-center">
              <MapPin size={'16'} className="mr-2 text-black text-opacity-50 dark:text-white dark:text-opacity-50"/>
              <span>{data.locationName}</span>
            </div>
          </div>
          <div className="text-sm mb-2 text-black text-opacity-50 dark:text-white dark:text-opacity-50">
            {truncateString(data.description, textTruncateLength)}
          </div>
          <small className="inline-flex items-center">
            Hosted by
            <div className="inline-flex items-center ml-2">
              <div className="h-6 w-6 mr-2">
                <GroupLogo group={data.org}/>
              </div>
              <strong>{data.org}</strong>
            </div>
          </small>
        </div>
      </div>
    </div>
  )
}

export default EventInterior