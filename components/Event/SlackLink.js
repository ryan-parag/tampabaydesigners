import React from 'react'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { SlackGroup } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'

const SlackLink = ({ group }) => {

  const { data, error } = useSWR('/api/slack', fetcher);

  const getGroup = el => {
    switch(el) {
      case 'Design St. Pete':
        return 'Design St. Pete'
        break;
      case 'Tampa Bay UX':
        return 'Tampa Bay UX'
        break;
      default:
        return 'Tampa Bay Designers'
    }
  }

  return(
    <ul className="pt-4">
      <li>
        <h5>Chat with us!</h5>
      </li>
      <li>
        <p className="text-xs lg:text-sm">Want more updates or want to chat with us before/after? Send a message in the Slack group!</p>
      </li>
      {
        error && (<Error/>)
      }
      {
        data ? (
          data.groups.map((item,i) => (
            <>
              {
                item.name === getGroup(group) && item.type.toLowerCase() === 'slack' && (
                  <motion.li
                    key={item.id}
                    className="opacity-0 top-4 relative"
                    animate={{ top: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SlackGroup data={item} />
                  </motion.li>
                )
              }
            </>
          ))
        )
        :
        (
          <Loading/>
        )
      }
    </ul>
  )
}

export default SlackLink