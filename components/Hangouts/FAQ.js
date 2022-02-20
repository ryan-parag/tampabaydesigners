import React from 'react'
import { HelpCircle } from 'react-feather'
import Collapse from '@components/Collapse'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { motion } from 'framer-motion'
import { Error, Loading } from '@components/DataStates'

const FAQ = () => {

  const descriptions = [
    {
      icon: '👯‍♀️',
      label: 'Meet and Greet'
    }, {
      icon: '👩‍🏫',
      label: 'Show & Tell'
    }, {
      icon: '✋',
      label: 'Portfolio Reviews'
    }, {
      icon: '‍💼',
      label: 'Job Stuff'
    }, {
      icon: '‍🎉',
      label: 'Great Atmosphere'
    }, {
      icon: '‍🤷‍♀️',
      label: 'Group Discussions'
    }
  ]

  const { data, error } = useSWR('/api/hangout-locations', fetcher);

  return(
    <>
      <h3>Frequently Asked Questions</h3>
      <Collapse title="What can I expect?">
        <ul className="flex flex-wrap items-center">
          {
            descriptions.map((item,i) => (
              <motion.li
                className="relative opacity-0 top-4"
                key={i}
                animate={{ opacity: 1, top: 0 }}
                transition={{ duration: 0.3, delay: `${0.2 + 0.12*i}` }}
              >
                <span className="mx-2 my-2 inline-flex shadow items-center tracking-wider text-xs uppercase font-sans bg-white bg-opacity-50 dark:bg-white dark:bg-opacity-10 text-black text-opacity-70 dark:text-white dark:text-opacity-70 backdrop-blur rounded-full px-4 py-1">
                  <span className="mr-2 text-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              </motion.li>
            ))
          }
        </ul>
      </Collapse>
      <Collapse title="When are hangouts scheduled?">
        <p className="leading-normal">Hangouts are held monthly, typically on the 2nd Thursday of each month (+ or - a week if it's looking stormy ⛈).</p>
      </Collapse>
      <Collapse title="Where do hangouts usually take place?">
      <p className="leading-normal">We typically get together at one of the following spots in the Tampa / St. Pete area:</p>
        {
          error && (<Error/>)
        }
        {
          data ? (
            <ul className="flex flex-wrap items-center mt-2">
              <motion.li
                className="relative opacity-0 top-4"
                animate={{ opacity: 1, top: 0 }}
                transition={{ duration: 0.12, delay: `${0.1}` }}
              >
                <a href="https://www.notion.so/55a02e26d37748c18e0ce465289c8f89?v=40b4710528974f7887279fa2d60af530" target="_blank" className="transition mr-2 my-2 inline-flex shadow items-center tracking-wider text-xs uppercase font-sans bg-black dark:bg-white bg-opacity-80 dark:bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-opacity-100 text-white dark:text-black text-opacity-80 backdrop-blur rounded-full pr-3 pl-1 py-1">
                  <HelpCircle size="20" className="mr-1" />
                  Want to recommend a spot?
                </a>
              </motion.li>
              {
                data.locations.length > 0 && (
                  data.locations.map((item,i) => (
                    <motion.li
                      className="relative opacity-0 top-4"
                      key={item.id}
                      animate={{ opacity: 1, top: 0 }}
                      transition={{ duration: 0.12, delay: `${0.1 + 0.05*i}` }}
                    >
                      <span className="mr-2 my-2 inline-flex shadow items-center tracking-wider text-xs uppercase font-sans bg-white bg-opacity-50 dark:bg-white dark:bg-opacity-10 text-black text-opacity-70 dark:text-white dark:text-opacity-70 backdrop-blur rounded-full pl-3 pr-1 py-1">
                        {item.name}
                        <span className={`ml-2 px-2 py-1 rounded-full ${item.region === 'Tampa' ? 'bg-indigo-500 text-indigo-700 dark:text-indigo-300 bg-opacity-20' : 'bg-green-500 text-green-700 dark:text-green-300 bg-opacity-20'}`}>
                          {item.region}
                        </span>
                      </span>
                    </motion.li>
                  ))
                )
              }
            </ul>
          )
          :
          (
            <Loading/>
          )
        }
      </Collapse>
    </>
  )
}

export default FAQ