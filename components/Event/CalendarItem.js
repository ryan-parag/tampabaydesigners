import React from 'react'
import moment from 'moment'
import Tag from '@components/Tag'

const CalendarItem = ({date, diff}) => {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const formatDate = date => {
    let d = new Date(date)
    let year = d.getFullYear()
    const dateObj = {
      dayString: dayNames[moment(date).day()],
      numString: moment(date).date(),
      monthString: monthNames[moment(date).month()],
      yearString: year
    }
    return dateObj
  }

  return(
    <div className="relative z-10 rounded-lg text-center bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm overflow-hidden shadow flex flex-col w-full">
      <div className="text-xs font-semibold py-1 bg-red-500 uppercase text-white font-mono tracking-widest">{formatDate(date).dayString}</div>
      <div className="text-lg text-black dark:text-white md:text-2xl font-extrabold py-1 font-mono">{formatDate(date).numString}</div>
      <div className="text-xs pb-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50 font-mono">{formatDate(date).monthString}{' '}{formatDate(date).yearString}</div>
    </div>
  )
}

export const CalendarMobile = ({date, time, diff, padding}) => {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const formatDate = date => {
    let d = new Date(date)
    let year = d.getFullYear()
    const dateObj = {
      dayString: dayNames[moment(date).day()],
      numString: moment(date).date(),
      monthString: monthNames[moment(date).month()],
      yearString: year
    }
    return dateObj
  }

  return(
    <div className={`absolute top-0 right-0 left-0 w-full flex justify-between items-center py-2 px-${padding} border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10`}>
      <div className="text-xs font-semibold uppercase font-mono tracking-widest">
        <Tag color={'green'}><span className="font-bold font-mono leading-tight">{formatDate(date).dayString}</span></Tag>
        <span className="mx-2 opacity-50">/</span>
        {
          diff && diff < 7 ? (
            <span className="text-green-700 dark:text-green-500">In {diff} day{diff !== 1 && 's'}</span>
          )
          :
          (
            <>
              {formatDate(date).monthString} {formatDate(date).numString}{' '}{formatDate(date).yearString}
            </>
          )
        }
      </div>
      <Tag><span className="font-bold font-mono leading-tight">{time}</span></Tag>
    </div>
  )
}

export default CalendarItem