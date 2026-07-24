import React from 'react'
import Tag from '@components/Tag'
import { formatDateParts } from '@utils/date'

const CalendarItem = ({date, diff}) => {

  const { dayString, numString, monthString, yearString } = formatDateParts(date)

  return(
    <div className="relative z-10 rounded-lg text-center bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm overflow-hidden shadow flex flex-col w-full">
      <div className="text-xs font-semibold py-1 bg-red-500 uppercase text-white font-mono tracking-widest">{dayString}</div>
      <div className="text-lg text-black dark:text-white md:text-2xl font-extrabold py-1 font-mono">{numString}</div>
      <div className="text-xs pb-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50 font-mono">{monthString}{' '}{yearString}</div>
    </div>
  )
}

// Static lookup so Tailwind's JIT can see the padding class.
const PX = { '3': 'px-3', '4': 'px-4' }

export const CalendarMobile = ({date, time, diff, padding}) => {

  const { dayString, numString, monthString, yearString } = formatDateParts(date, { longMonth: true })

  return(
    <div className={`absolute top-0 right-0 left-0 w-full flex justify-between items-center py-2 ${PX[padding] || ''} border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10`}>
      <div className="text-xs font-semibold uppercase font-mono tracking-widest">
        <Tag color={'green'}><span className="font-bold font-mono leading-tight">{dayString}</span></Tag>
        <span className="mx-2 opacity-50">/</span>
        {
          diff && diff >= 0 && diff <= 7 ? (
            <span className="text-green-700 dark:text-green-500">In {diff} day{diff !== 1 && 's'} 🎉</span>
          )
          :
          (
            <>
              {monthString} {numString}{' '}{yearString}
            </>
          )
        }
      </div>
      <Tag><span className="font-bold font-mono leading-tight">{time}</span></Tag>
    </div>
  )
}

export default CalendarItem
