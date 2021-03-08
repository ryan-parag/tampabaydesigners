import Link from 'next/link'
import { motion } from 'framer-motion'
import { BoxLink } from '@components/Box'
import moment from 'moment'

const InterviewList = ({interviews}) => {
  return(
    <div>
      {!interviews && <div>No posts!</div>}
      {
        interviews && interviews.map((item,i) => (
          <motion.div
            className="top-8 relative opacity-0 mb-4"
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.02*i }}
            key={i}
          >
            <BoxLink>
              <Link href={`/interviews/${item.slug}`}>
                <a>
                  <div className="flex">
                    <div className="flex">
                      <img src={item.frontmatter.photo} className="h-12 w-12 rounded-full"/>
                    </div>
                    <div className="flex-col sm:flex-row flex-1 flex justify-between pl-4">
                      <div>
                        <div className="font-bold mb-2">{item.frontmatter.name}</div>
                        <div className="mb-2 sm:mb-0 text-sm text--secondary">{item.frontmatter.description}</div>
                        <div className="mt-2 text-xs text--secondary">{moment(item.frontmatter.date).format('dddd, MMMM, Do YYYY')}</div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </BoxLink>
          </motion.div>
        ))
      }
    </div>
  )
}

export default InterviewList
