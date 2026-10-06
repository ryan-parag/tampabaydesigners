import React, { useRef } from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Event } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'
import FadeIn from '@components/FadeIn'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { ArrowLeft } from 'react-feather'

const YearTabs = ({ years, active, onSelect }) => {

  const tabs = useRef([])

  // Arrow keys move between chips, per the WAI-ARIA tabs pattern
  const onKeyDown = (e, i) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (i + step + years.length) % years.length
    tabs.current[next]?.focus()
    onSelect(years[next])
  }

  return (
    <div role="tablist" aria-label="Year" className="flex flex-wrap gap-2 pt-4 pb-2">
      {
        years.map((year, i) => {
          const selected = year === active
          return (
            <button
              key={year}
              ref={el => tabs.current[i] = el}
              role="tab"
              id={`year-tab-${year}`}
              aria-selected={selected}
              aria-controls="year-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(year)}
              onKeyDown={e => onKeyDown(e, i)}
              className={`rounded-full inline-flex items-center text-sm font-mono tracking-wide py-1 px-4 border shadow transition active:scale-[97%] ${selected ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'bg-white dark:bg-white dark:bg-opacity-5 dark:border-white dark:border-opacity-10 text-black text-opacity-60 dark:text-white dark:text-opacity-60 hover:text-opacity-100 dark:hover:text-opacity-100'}`}
            >
              {year}
            </button>
          )
        })
      }
    </div>
  )
}

const PastEvents = ({ title, description, ...props }) => {

  const router = useRouter()

  const currentYear = new Date().getFullYear()
  const requested = parseInt(router.query.year, 10)
  const year = requested >= 2000 && requested <= currentYear ? requested : currentYear

  const { data, error, mutate } = useSWR(router.isReady ? `/api/events/past?year=${year}` : null, fetcher);

  // Keep the chips on screen while the next year's events load
  const lastYears = useRef(null)
  if (data?.years) lastYears.current = data.years
  const years = lastYears.current

  const selectYear = (next) => {
    router.replace(
      { pathname: router.pathname, query: next === currentYear ? {} : { year: next } },
      undefined,
      { shallow: true, scroll: false }
    )
  }

  return (
    <Layout pageTitle={'Past Events'} description={description} ogImage={'/tbd-events.png'}>
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
          <div className="flex mb-8">
            <Link href="/events" className="hover:underline inline-flex items-center">
              <ArrowLeft
                size={'20'}
                className="mr-1"
              />Upcoming events
            </Link>
          </div>
          <h1>Past Events</h1>
          <p className="lead">
          A look back at the hangouts, coworks, and events our community has hosted:
          </p>
          {
            years && (
              <YearTabs years={years} active={year} onSelect={selectYear} />
            )
          }
          <div
            id="year-panel"
            role="tabpanel"
            aria-labelledby={`year-tab-${year}`}
            className="pt-4"
          >
            {
              error ? (
                <Error onRetry={() => mutate()}/>
              )
              : !data ? (
                <Loading/>
              )
              : data.events.length === 0 ? (
                <Empty>
                  No past events in {year}
                </Empty>
              )
              : (
                <ul>
                  {
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
                  }
                </ul>
              )
            }
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default PastEvents

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
