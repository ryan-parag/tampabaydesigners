import Layout from '@components/Layout'
import Airtable from 'airtable'
import React, { useEffect,useState } from 'react'
import Event from '@components/Event'
import { Box } from '@components/Box'
import styled from 'styled-components'
import Title from '@components/Title'

const EmptyState = styled.div`
  ${Box}
  color: var(--gray500);
  background: transparent;
  border: 0;
  padding-top: ${({theme}) => theme.space[7]};
  padding-bottom: ${({theme}) => theme.space[7]};
  .EmptyState__Icon {
    margin-bottom: ${({theme}) => theme.space[3]};;
  }
`


const EventList = ({events}) => {

  let newDate = new Date()

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const designGroups = {
    tampaBayUx: {
      img: '/tampa-bay-ux.png'
    },
    designStPete: {
      img: '/design-st-pete.png'
    },
    dribbbleTampa: {
      img: 'dribbble-tampa.png'
    },
    sketchTampa: {
      img: 'sketch-tampa.png'
    },
    figmaTampa: {
      img: '/figma-tampa.png'
    },
    default: {
      img: '/favicon/tbd.svg'
    }
  }

  const renderImg = (group) => {
    switch (group) {
      case 'Tampa Bay UX':
        return designGroups.tampaBayUx.img
        break;
      case 'Design St. Pete':
        return designGroups.designStPete.img
        break;
      case 'Dribbble Tampa':
        return designGroups.dribbbleTampa.img
        break;
      case 'Sketch Tampa':
        return designGroups.sketchTampa.img
        break;
      case 'Figma Tampa':
        return designGroups.figmaTampa.img
        break;
      default:
        return designGroups.default.img
    }
  }

  const formatDate = date => {
    let d = new Date(date)
    let month = d.getMonth()
    let year = d.getFullYear()
    let day = d.getDay()
    return dayNames[day] + ', ' + monthNames[month] + ' ' + d.getDate() + ' ' + year
  }

  return (
    <div>
      <div className="text-sm mb-4">Find an event to attend:</div>
      {
        events.length > 0 ?
          events.map(event => (
            <Event
              key={event.eventName}
              link={event.link}
              name={event.eventName}
              img={renderImg(event.org)}
              description={event.description}
              date={formatDate(event.date)}
              org={event.org}
            />
          )) :
          (
            <EmptyState>
              <svg className="EmptyState__Icon" width="56" height="56" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              No Upcoming Events
            </EmptyState>
          )
      }
    </div>
  )
}

const Events = ({ title, description, ...props }) => {
  const [state, setState] = useState([])
  const [unverified, setUnverified] = useState([])

  const designEvents=[]
  const unverifiedEvents=[]

  const callAirtable = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    base('events').select({
      view: 'Grid view'
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let verified = record.get('Verified')
        if(verified) {
          let upcoming = new Date(record.get('Date')) >= new Date()
          if(upcoming) {
            let newEvent = {
              eventName:  record.get('Event Name'),
              org:  record.get('Org'),
              date: record.get('Date'),
              description: record.get('Description'),
              link: record.get('Link'),
            }
            designEvents.push(newEvent)
          }
        } else {
          unverifiedEvents.push(record.get('Event Name'))
        }
      })
      fetchNextPage()
      const sortedEvents = designEvents.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      setState(sortedEvents)
      setUnverified(unverifiedEvents)
    }, function done(err) {
      if( err) { console.log(err); return; }
    })
  }

  useEffect(() => {
    let unmounted = false

   callAirtable()

   return () => { unmounted = true }
  }, [])

  return (
    <>
      <Layout pageTitle={`${title} | Events`} description={description}>
        <Title
          title={'Upcoming Events'}
          subtitle={'Find an upcoming event to attend from the list below:'}
        />
        {
          unverified.length > 0 ? (
            <div style={{
              padding: '24px',
              background: 'var(--red)',
              color: 'var(--white)',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              {unverified.length} event{unverified.length > 1 ? 's' : null} submitted and pending verification.
            </div>
          )
          :
          null
        }
        <div>
          <EventList events={state}/>
        </div>
        <div className="block text-center mb-8">
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Don't see an event listed or want to submit one?{' '}
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfXiL1a1f70HFyf0uXmQLscm30vMUxzgRoO1pnV8dz2PGBttA/viewform?usp=sf_link">Submit an event to be listed</a>
        </div>
      </Layout>
    </>
  )
}

export default Events

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
