import React from 'react'
import { BoxOutbound } from '@components/Box'
import Chip from '@components/Chip'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SlackGroup({delay, img, name, description, link}) {

  const truncate = str => {
    return str.length > 70 ? str.substring(0, 70) + "..." : str;
  }

  const itemDelay = 0.3 * (delay + 1)

  return(
    <motion.div
      className="top-8 relative opacity-0"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: itemDelay }}
    >
      <BoxOutbound marginBottom={'4'} href={link} target="_blank">
        <div className="grid grid-cols-8 md:grid-cols-12">
          <div className="col-span-1">
            <div className="w-full relative">
              <div className="w-full rounded-full border-2 dark:border-white dark:border-opacity-10">
                <Image
                  className="block w-full rounded-full"
                  src={img}
                  width={100}
                  height={100}
                  loading={'lazy'}
                  alt={name}
                />
              </div>
              <div className="inline-block h-7 w-7 bg-black dark:bg-white border-2 border-white dark:border-black rounded-full p-1 absolute -right-2 -bottom-2">
                <svg viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.4 78.2003C26.4 85.3003 20.6 91.1003 13.5 91.1003C6.39998 91.1003 0.599976 85.3003 0.599976 78.2003C0.599976 71.1003 6.39998 65.3003 13.5 65.3003H26.4V78.2003Z" fill="#E01E5A"/>
                  <path d="M32.9 78.2003C32.9 71.1003 38.7 65.3003 45.8 65.3003C52.9 65.3003 58.7 71.1003 58.7 78.2003V110.5C58.7 117.6 52.9 123.4 45.8 123.4C38.7 123.4 32.9 117.6 32.9 110.5V78.2003Z" fill="#E01E5A"/>
                  <path d="M45.8 26.4001C38.7 26.4001 32.9 20.6001 32.9 13.5001C32.9 6.4001 38.7 0.600098 45.8 0.600098C52.9 0.600098 58.7 6.4001 58.7 13.5001V26.4001H45.8Z" fill="#36C5F0"/>
                  <path d="M45.8 32.8999C52.9 32.8999 58.7 38.6999 58.7 45.7999C58.7 52.8999 52.9 58.6999 45.8 58.6999H13.5C6.39998 58.6999 0.599976 52.8999 0.599976 45.7999C0.599976 38.6999 6.39998 32.8999 13.5 32.8999H45.8Z" fill="#36C5F0"/>
                  <path d="M97.6 45.7999C97.6 38.6999 103.4 32.8999 110.5 32.8999C117.6 32.8999 123.4 38.6999 123.4 45.7999C123.4 52.8999 117.6 58.6999 110.5 58.6999H97.6V45.7999Z" fill="#2EB67D"/>
                  <path d="M91.0999 45.8001C91.0999 52.9001 85.2999 58.7001 78.1999 58.7001C71.0999 58.7001 65.2999 52.9001 65.2999 45.8001V13.5001C65.2999 6.4001 71.0999 0.600098 78.1999 0.600098C85.2999 0.600098 91.0999 6.4001 91.0999 13.5001V45.8001Z" fill="#2EB67D"/>
                  <path d="M78.1999 97.6001C85.2999 97.6001 91.0999 103.4 91.0999 110.5C91.0999 117.6 85.2999 123.4 78.1999 123.4C71.0999 123.4 65.2999 117.6 65.2999 110.5V97.6001H78.1999Z" fill="#ECB22E"/>
                  <path d="M78.1999 91.1003C71.0999 91.1003 65.2999 85.3003 65.2999 78.2003C65.2999 71.1003 71.0999 65.3003 78.1999 65.3003H110.5C117.6 65.3003 123.4 71.1003 123.4 78.2003C123.4 85.3003 117.6 91.1003 110.5 91.1003H78.1999Z" fill="#ECB22E"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="pl-6 col-span-7 md:col-span-11">
            <p className="text-sm mb-2 font-bold">{name}</p>
            <p className="text-xs mb-4 text--secondary">{description}</p>
            <Chip type="yellow">Join Group</Chip>
          </div>
        </div>
      </BoxOutbound>
    </motion.div>
  )
}