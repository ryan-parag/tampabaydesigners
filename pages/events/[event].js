import React from 'react'
import { useRouter } from "next/router";
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CalendarItem, SlackGroup } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'
import Link from 'next/link'
import moment from 'moment'
import { SignUp } from '@components/Hangouts'
import { ArrowLeft, MapPin, Clock } from 'react-feather'
import FAQ, { CoworkFAQ } from '@components/Hangouts/FAQ'
import Box, { BoxAnchor } from '@components/Box'

const SlackLink = () => {

  const { data, error } = useSWR('/api/slack', fetcher);

  return(
    <ul className="pt-4">
      <li>
        <h5>Want more updates or want to chat with us before/after? Send a message in the Slack group!</h5>
      </li>
      {
        error && (<Error/>)
      }
      {
        data ? (
          data.groups.map((item,i) => (
            <>
              {
                item.name === 'Tampa Bay Designers' && item.type.toLowerCase() === 'slack' && (
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

const EventInfo = ({ date, location }) => {

  const { data, error } = useSWR(`/api/hangout-locations/${location}`, fetcher);

  return(
    <>
      <div className="w-full">
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Box p={'0'}>
            <div className="flex">
              <div className="h-full items-start p-2 hidden md:inline-flex">
                <Clock size={'20'}/>
              </div>
              <div className="flex flex-col w-full flex-1">
                <span className="text-xs block mb-1 p-2 pb-1">When</span>
                <span className="font-bold px-2 pb-2">{date}</span>
              </div>
            </div>
          </Box>
        </motion.div>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {
            data ? (
              <>
                {
                  data.item.name === 'TBA' ? (
                    <Box p={'0'}>
                      <div className="flex">
                        <div className="h-full items-start p-2 hidden md:inline-flex">
                          <MapPin size={'20'}/>
                        </div>
                        <div className="flex flex-col w-full flex-1">
                          <span className="text-xs block mb-1 p-2 pb-1">Where</span>
                          {
                            data.item ? (
                              <div className="px-2 pb-2">
                                <span className="font-bold block mb-1">{data.item.name}</span>
                                <span className="text-sm">{data.item.address}</span>
                              </div>
                            )
                            :
                            (
                              <div className="px-2 pb-2">
                                <span>No location</span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </Box>
                  )
                  :
                  (
                    <BoxAnchor p={'0'} href={`https://maps.google.com/?q=${data.item.name}`} target="_blank">
                      <div className="flex">
                        <div className="h-full items-start p-2 hidden md:inline-flex">
                          <MapPin size={'20'}/>
                        </div>
                        <div className="flex flex-col w-full flex-1">
                          <span className="text-xs block mb-1 p-2 pb-1">Where</span>
                          {
                            data.item ? (
                              <div className="px-2 pb-2">
                                <span className="font-bold block mb-1">{data.item.name}</span>
                                <span className="text-sm">{data.item.address}</span>
                                <span className="block text-xs mt-2 underline">View on Map</span>
                              </div>
                            )
                            :
                            (
                              <div className="px-2 pb-2">
                                <span>No location</span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </BoxAnchor>
                  )
                }
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
      </div>
    </>
  )
}

const Events = ({ title, description, ...props }) => {

  const router = useRouter();
  const { event } = router.query;

  const { data, error } = useSWR(`/api/events/${event}`, fetcher);
  
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

  const metaURLs = ['/tbd-sm.png', '/hangout-sm.png', '/cowork-social-media.png']

  const getMeta = (name) => {
    if(name === 'Design Hangout') {
      return metaURLs[1]
    } else if(name === 'Designer Cowork') {
      return metaURLs[2]
    } else {
      return metaURLs[0]
    }
  }


  return (
    <>
      {
        error && (
          <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
            <section
              className="pt-24 pb-24 flex flex-col"
              style={{
                backgroundImage: "url('/static/blur-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="container p-3 mx-auto lg:w-1/2">
                <div className="flex mb-8">
                  <Link href="/events">
                    <a className="hover:underline inline-flex items-center">
                      <ArrowLeft
                        size={'20'}
                        className="mr-1"
                      />
                      Back
                    </a>
                  </Link>
                </div>
                <Error/>
              </div>
            </section>
          </Layout>
        )
      }
      {
        data ? (
          <>
            {
              data.item ? (
                <>
                  <Layout pageTitle={title} description={description} ogImage={getMeta(data.item.name)}>
                    <section
                      className="pt-24 pb-24 flex flex-col"
                      style={{
                        backgroundImage: "url('/static/blur-bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="container p-3 mx-auto lg:w-1/2">
                        <div className="flex mb-8">
                          <Link href="/events">
                            <a className="hover:underline inline-flex items-center">
                              <ArrowLeft
                                size={'20'}
                                className="mr-1"
                              />
                              Back
                            </a>
                          </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-start">
                          <motion.div
                            className="relative w-24 mr-0 md:mr-8 mb-4 md:mb-0 opacity-0 border border-black rounded-lg border-opacity-10 dark:border-white dark:border-opacity-20 shadow"
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CalendarItem
                              day={formatDate(data.item.date).dayString}
                              num={formatDate(data.item.date).numString}
                              month={formatDate(data.item.date).monthString}
                              year={formatDate(data.item.date).yearString}
                            />
                          </motion.div>
                          <motion.div
                            className="w-full relative flex flex-1 flex-col items-center md:items-start opacity-0 -left-4 mt-4 md:mt-0 text-center md:text-left"
                            animate={{ opacity: 1, left: 0}}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <h1 className="my-0">{data.item.name}</h1>
                            <p className="mt-2 mb-2 text-sm">{data.item.description}</p>
                            <EventInfo
                              date={moment(data.item.date).format('LLLL')}
                              location={data.item.location}
                            />
                            <SlackLink/>
                          </motion.div>
                        </div>
                        <hr className="my-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                        <SignUp/>
                        <hr className="my-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                        {
                          data.item.name === 'Design Hangout' && (
                            <FAQ/>
                          )
                        }
                        {
                          data.item.name === 'Designer Cowork' && (
                            <CoworkFAQ/>
                          )
                        }
                      </div>
                    </section>
                  </Layout>
                </>
              )
              :
              (
                <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
                  <section
                    className="pt-24 pb-24 flex flex-col"
                    style={{
                      backgroundImage: "url('/static/blur-bg.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className="container p-3 mx-auto lg:w-1/2">
                      <div className="flex mb-8">
                        <Link href="/events">
                          <a className="hover:underline inline-flex items-center">
                            <ArrowLeft
                              size={'20'}
                              className="mr-1"
                            />
                            Back
                          </a>
                        </Link>
                      </div>
                      <Empty>
                        This event does not exist
                      </Empty>
                    </div>
                  </section>
                </Layout>
              )
            }
          </>
        )
        :
        (
          <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
            <section
              className="pt-24 pb-24 flex flex-col"
              style={{
                backgroundImage: "url('/static/blur-bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="container p-3 mx-auto lg:w-1/2">
                <div className="flex mb-8">
                  <Link href="/events">
                    <a className="hover:underline inline-flex items-center">
                      <ArrowLeft
                        size={'20'}
                        className="mr-1"
                      />
                      Back
                    </a>
                  </Link>
                </div>
                <Loading/>
              </div>
            </section>
          </Layout>
        )
      }
    </>
  )
}

export default Events

export async function getServerSideProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}