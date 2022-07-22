import React from 'react'
import moment from 'moment'
import { SignUp } from '@components/Hangouts'
import FAQ, { CoworkFAQ } from '@components/Hangouts/FAQ'
import SlackLink from '@components/Event/SlackLink';
import EventInfo from '@components/Event/EventInfo';

const Body = ({ event }) => {
  return(
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
            date={moment(event.date).format('LLLL')}
            location={event.location}
          />
        </div>
        <div className="col-span-2">
          <h5 className="mt-0 mb-2">About this event</h5>
          <p className="mt-0 mb-6">{event.description}</p>
          <SlackLink group={event.org} />
        </div>
        <div className="hidden xl:block">
          <h5 className="mt-0 mb-2">Event Details</h5>
          <EventInfo
            date={moment(event.date).format('LLLL')}
            location={event.location}
          />
        </div>
      </div>
      <div className="container p-3 mx-auto lg:w-1/2 pt-12">
        {
          event.name === 'Design Hangout' && (
            <FAQ/>
          )
        }
        {
          event.name === 'Designer Cowork' && (
            <CoworkFAQ/>
          )
        }
        <div className="relative">
          <SignUp/>
        </div>
      </div>
    </section>
  )
}

export default Body