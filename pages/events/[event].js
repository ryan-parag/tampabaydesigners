import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'
import Link from 'next/link'
import moment from 'moment'
import { SignUp } from '@components/Hangouts'
import { ArrowLeft, MapPin, Clock, Check, Loader } from 'react-feather'
import FAQ, { CoworkFAQ } from '@components/Hangouts/FAQ'
import Box from '@components/Box'
import { GroupLogo } from '@components/Logo'
import AddToCalendar from '@components/Event/AddToCalendar';
import SlackLink from '@components/Event/SlackLink';
import EventInfo from '@components/Event/EventInfo';
import Header from '@components/Event/Header'
import Body from '@components/Event/Body'

const Events = ({ title, description, ...props }) => {

  const router = useRouter();
  const { event } = router.query;

  const { data, error } = useSWR(`/api/events/${event}`, fetcher);

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
                    <Header event={data.item} />
                    <Body event={data.item}/>
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