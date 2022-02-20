import React from 'react'
import { useRouter } from "next/router";
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event, CalendarItem } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'
import Link from 'next/link'
import moment from 'moment'
import { SignUp } from '@components/Hangouts'
import Tag from '@components/Tag'
import { ArrowLeft } from 'react-feather'
import FAQ from '@components/Hangouts/FAQ'

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


  return (
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
          {
            error && (<Error/>)
          }
          {
            data ? (
              <>
                {
                  data.item ? (
                    <>
                      <div className="flex flex-col md:flex-row items-center md:items-start">
                        <motion.div
                          className="relative w-36 mr-0 md:mr-8 mb-4 md:mb-0 opacity-0"
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
                          className="relative flex flex-1 flex-col items-center md:items-start opacity-0 -left-4 mt-4 md:mt-0 text-center md:text-left"
                          animate={{ opacity: 1, left: 0}}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <h1 className="my-0">{data.item.name}</h1>
                          <p className="mt-2 mb-2 text-sm">{data.item.description}</p>
                          <p className="mb-4 text-sm">
                            <Tag color="green">
                              {moment(data.item.date).format('LLLL')}
                            </Tag>
                          </p>
                        </motion.div>
                      </div>
                      <hr className="my-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                      <SignUp/>
                      <hr className="my-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                      <FAQ/>
                    </>
                  )
                  :
                  (
                    <Empty>
                      This event does not exist
                    </Empty>
                  )
                }
              </>
            )
            :
            (
              <Loading/>
            )
          }
        </div>
      </section>
    </Layout>
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