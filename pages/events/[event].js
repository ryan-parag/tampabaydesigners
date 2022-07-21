import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { SlackGroup } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'
import Link from 'next/link'
import moment from 'moment'
import { SignUp } from '@components/Hangouts'
import { ArrowLeft, MapPin, Clock, Check } from 'react-feather'
import FAQ, { CoworkFAQ } from '@components/Hangouts/FAQ'
import Box from '@components/Box'
import { GroupLogo } from '@components/Logo'

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

const EventInfo = ({ date, location }) => {

  const { data, error } = useSWR(`/api/hangout-locations/${location}`, fetcher);

  return(
    <div className="grid grid-cols-1">
      <Box mt={'0'}>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center mb-2 text-black text-opacity-60 dark:text-white dark:text-opacity-50">
            <span className="pr-2 mt-0 mb-0 text-sm">Date and time</span>
            <Clock size={'16'}/>
          </div>
          <p className="text-sm my-0">{date}</p>
        </motion.div>
        <hr className="my-4 border-b border-gray-400 border-opacity-10 dark:border-gray-400 dark:border-opacity-10"/>
        <motion.div
          className="relative w-full opacity-0 top-4"
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          {
            data ? (
              <>
                <div className="flex items-center mb-2 text-black text-opacity-60 dark:text-white dark:text-opacity-50">
                  <span className="pr-2 mt-0 mb-0 text-sm">Location</span>
                  <MapPin size={'16'}/>
                </div>
                <div>
                  <p className="text-sm font-bold my-0">{data.item.name}</p>
                  <span className="text-xs">{data.item.address}</span>
                  {
                    data.item.name === 'TBA' ? (
                      <span className="block text-sm mt-2">Location TBA</span>
                    )
                    :
                    (
                      <a className="block text-xs mt-2 underline" href={`https://maps.google.com/?q=${data.item.name}`} target="_blank" rel="noreferrer">View on Map</a>
                    )
                  }
                </div>
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
      </Box>
    </div>
  )
}

const Events = ({ title, description, ...props }) => {

  const router = useRouter();
  const { event } = router.query;

  const { data, error } = useSWR(`/api/events/${event}`, fetcher);

  const [copy, setCopy] = useState(false)

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const copyLink = (string) => {
    copyTextToClipboard(string)
    .then(() => {
      setCopy(true)
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  },[copy])
  
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
                    <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-50 w-full border-b border-gray-400 border-opacity-10 dark:border-gray-400 dark:border-opacity-10 shadow-lg">
                      <div className="container px-3 py-8 mx-auto lg:w-1/2 flex">
                        <div className="flex-1 pr-4">
                          <span className="text-xs lg:text-sm">{moment(data.item.date).format('LLLL')}</span>
                          <h1 className="my-3 text-2xl lg:text-4xl">{data.item.name}</h1>
                          <motion.div
                            className="relative flex items-center opacity-0"
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span>
                              Hosted by
                            </span>
                            <div className="inline-flex items-center ml-2 dark:text-white text-black">
                              <div className="h-6 w-6">
                                <GroupLogo group={data.item.org}/>
                              </div>
                              <strong className="ml-2">{data.item.org}</strong>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      <div className={`container px-3 pb-8 mx-auto lg:w-1/2 grid grid-cols-${!data.item.link.includes('tampabay.design') ? '2' : '1'} gap-4`}>
                        {
                          !data.item.link.includes('tampabay.design') && (
                            <a href={data.item.link} target="_blank" rel="noreferrer" className="button button--primary my-0">Attend</a>
                          )
                        }
                        {
                          copy ? (
                            <div className="text-center px-4 cursor-pointer py-3 my-0 inline-flex justify-center items-center border border-transparent">
                              <Check size={'16'} className="text-green-500 mr-2"/>
                              Copied
                            </div>
                          )
                          :
                          (
                            <button onClick={() => copyLink(`https://tampabay.design/events/${data.item.id}`)} className="button my-0">Copy Link</button>
                          )
                        }
                      </div>
                    </div>
                    <section
                      className="pt-0 xl:pt-12 pb-12 flex flex-col"
                      style={{
                        backgroundImage: "url('/static/blur-bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="container p-3 mx-auto lg:w-1/2 grid grid-cols-1 xl:grid-cols-3 gap-y-6 lg:gap-x-6">
                        <div className="mb-6 mt-4 block xl:hidden">
                          <h5 className="mt-0 mb-2">Event Details</h5>
                          <EventInfo
                            date={moment(data.item.date).format('LLLL')}
                            location={data.item.location}
                          />
                        </div>
                        <div className="col-span-2">
                          <h5 className="mt-0 mb-2">About this event</h5>
                          <p className="mt-0 mb-6">{data.item.description}</p>
                          <SlackLink group={data.item.org} />
                        </div>
                        <div className="hidden xl:block">
                          <h5 className="mt-0 mb-2">Event Details</h5>
                          <EventInfo
                            date={moment(data.item.date).format('LLLL')}
                            location={data.item.location}
                          />
                        </div>
                      </div>
                      <div className="container p-3 mx-auto lg:w-1/2 pt-12">
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
                        <div className="relative">
                          <SignUp/>
                        </div>
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