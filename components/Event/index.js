import React from 'react'
import { BoxOutbound } from '@components/Box'
import Image from 'next/image'

const CalendarItem = ({day, num, month, year}) => {
  return(
    <div className="rounded-lg text-center bg-gray-100 dark:bg-white overflow-hidden border border-black border-opacity-5 dark:border-white dark:border-opacity-5 dark:bg-opacity-10 shadow flex flex-col w-full">
      <div className="text-xs font-semibold py-1 bg-red-500 uppercase text-white font-mono">{day.substring(0, 3)}</div>
      <div className="text-lg md:text-2xl font-extrabold py-1 font-mono">{num}</div>
      <div className="text-xs pb-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50 font-mono">{month.substring(0, 3)}{' '}{year}</div>
    </div>
  )
}

export default function Event({img, org, name, description, date, link}) {

  let newDate = new Date()

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const formatDate = date => {
    let d = new Date(date)
    let month = d.getMonth()
    let year = d.getFullYear()
    let day = d.getDay() + 1
    const dateObj = {
      dayString: dayNames[day],
      numString: d.getDate() + 1,
      monthString: monthNames[month],
      yearString: year
    }
    return dateObj
  }
  return(
      <BoxOutbound marginBottom={'4'} href={link} target="_blank">
        <div className="grid grid-cols-8 md:grid-cols-12">
          <div className="col-span-6 md:col-span-10 flex">
            <div className="pr-4 md:pr-8">
              <p className="text-sm mb-2 font-bold">{name}</p>
              <p className="text-xs text-pink-500 mb-2 font-semibold">Hosted by {org}</p>
              <p className="text-xs mb-2 text--secondary">{description}</p>
            </div>
          </div>
          <div className="relative col-span-2 pt-1">
            <div className="w-10 h-10 md:w-12 md:h-12 absolute transform -top-2 -left-4 md:-left-4 rounded-full border-4 border-white dark:border-black">
              <Image
                className="block w-full rounded-full"
                src={img}
                width={100}
                height={100}
                loading={'lazy'}
                alt={name}
              />
            </div>
            <CalendarItem
              day={formatDate(date).dayString}
              num={formatDate(date).numString}
              month={formatDate(date).monthString}
              year={formatDate(date).yearString}
            />
          </div>
        </div>
      </BoxOutbound>
  )
}