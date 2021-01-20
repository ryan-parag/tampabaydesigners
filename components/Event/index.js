import React from 'react'
import { BoxOutbound } from '@components/Box'
import Chip from '@components/Chip'
import { Calendar } from 'react-feather'

export default function Event({img, org, name, description, date, link}) {

  const truncate = str => {
    return str.length > 70 ? str.substring(0, 70) + "..." : str;
  }

  return(
      <BoxOutbound marginBottom={'4'} href={link} target="_blank">
        <div className="grid grid-cols-8 md:grid-cols-12">
          <div className="col-span-1">
            <div className="w-full rounded-full border-2 dark:border-white dark:border-opacity-10">
              <img className="block w-full rounded-full" src={img}/>
            </div>
          </div>
          <div className="pl-4 col-span-7 md:col-span-11">
            <p className="text-sm mb-2 font-bold">{name}</p>
            <p className="text-xs text-black text-opacity-70 mb-2 dark:text-white dark:text-opacity-70">{description}</p>
            <p className="text-xs text-black text-opacity-70 mb-2 dark:text-white dark:text-opacity-70">Hosted by {org}</p>
            <Chip type="pink">
              <Calendar size={16} />{' '}
              <span className="ml-2">{date}</span>
            </Chip>
          </div>
        </div>
      </BoxOutbound>
  )
}