import React from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import { motion } from 'framer-motion'
import Link from 'next/link';

const Events = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/events', fetcher);

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-events.png'}>
      <section
        className="pt-24 pb-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <h1>Upcoming Events</h1>
          <p className="lead">
          Find an upcoming event to attend from the list below:
          </p>
          <ul className="pt-4">
            {
              error && (<Error/>)
            }
            {
              data ? (
                <>
                  {
                    data.events.length > 0 ? (
                      data.events.map((item,i) => (
                        <motion.li
                          key={item.id}
                          className="opacity-0 top-4 relative"
                          animate={{ top: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3*i }}
                        >
                          <Event data={item} />
                        </motion.li>
                      ))
                    )
                    :
                    (
                      <Empty>
                        No events - check back soon
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
          </ul>
          <p className="text-sm">
            Can't decide on a hangout spot?&nbsp;
            <Link href="/random">
              <a className="underline">Use the randomizer</a>
            </Link>
            !
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Events

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}