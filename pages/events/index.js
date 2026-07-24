import React from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event, AnchorCard } from '@components/ListItem'
import config from '../../siteconfig.json'
import { Error, Loading, Empty } from '@components/DataStates'
import FadeIn from '@components/FadeIn'
import Link from 'next/link';

const Events = ({ title, description, ...props }) => {

  const { data, error, mutate } = useSWR('/api/events', fetcher);

  return (
    <Layout pageTitle={'Upcoming Events'} description={description} ogImage={'/tbd-events.png'}>
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
              error ? (
                <Error onRetry={() => mutate()}>
                  <a
                    className="button mx-2"
                    href={config.meetupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse events on Meetup
                  </a>
                </Error>
              )
              : !data ? (
                <Loading/>
              )
              : data.events.length === 0 ? (
                <Empty>
                  No events - check back soon
                </Empty>
              )
              : (
                data.events.map((item,i) => (
                  <FadeIn
                    as={'li'}
                    key={item.id}
                    className="relative"
                    delay={Math.min(0.08*i, 0.4)}
                  >
                    <Event data={item} />
                  </FadeIn>
                ))
              )
            }
          </ul>
          <div className="pt-4">
            <AnchorCard
              href={config.meetupUrl}
              tint={'pink'}
              label={'Join us on Meetup'}
              type={'meetup'}
            />
          </div>
          <p className="text-sm">
            Can't decide on a hangout spot?&nbsp;
            <Link href="/random" className="underline">
              Use the randomizer
            </Link>
            !
          </p>
        </div>
      </section>
    </Layout>
  );
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