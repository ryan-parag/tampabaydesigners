import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Error, Loading, Empty } from '@components/DataStates'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Check, Loader } from 'react-feather'
import Header from '@components/Event/Header'
import Body from '@components/Event/Body'

const Events = ({ title, description, ...props }) => {

  const router = useRouter();
  const { event } = router.query;

  const { data, error } = useSWR(`/api/events/${event}`, fetcher);


  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-events.png'}>
      {
        error && (
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
        )
      }
      {
        data ? (
          <>
            {
              data.item ? (
                <>
                  <Header event={data.item} />
                  <Body event={data.item}/>
                </>
              )
              :
              (
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
              )
            }
          </>
        )
        :
        (
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
        )
      }
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