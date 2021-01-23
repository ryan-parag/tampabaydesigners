import Layout from '@components/Layout'
import Airtable from 'airtable'
import React, { useEffect,useState } from 'react'
import Event from '@components/Event'
import EmptyState from '@components/EmptyState'
import Title, { Subtitle } from '@components/Title'
import { motion } from 'framer-motion'
import groups from '@data/groups'
import Loading from '@components/Loading'


const EventList = ({events}) => {

  const getImage = (group) => {
    let findGroup = groups.filter(obj => obj.name.includes(group))
    return findGroup[0].img
  }

  const renderImg = (group) => {
    switch (group) {
      case 'Tampa Bay UX':
        return getImage(group)
        break;
      case 'Design St. Pete':
        return getImage(group)
        break;
      case 'Dribbble Tampa':
        return getImage(group)
        break;
      case 'Sketch Tampa':
        return getImage(group)
        break;
      case 'Figma Tampa':
        return getImage(group)
        break;
      default:
        return '/favicon/tbd.svg'
    }
  }

  return (
    <div>
      <Subtitle>Find an event to attend:</Subtitle>
      {
        events.length > 0 ?
          events.map((event, i) => (
              <Event
                link={event.link}
                name={event.eventName}
                img={renderImg(event.org)}
                description={event.description}
                date={event.date}
                org={event.org}
                key={event.eventName}
              />
          )) :
          (
            <EmptyState>
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
  const [loading, setLoading] = useState(true)

  const designEvents=[]
  const unverifiedEvents=[]

  const callAirtable = () => {
    setLoading(true)

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

    setLoading(false)
  }

  useEffect(() => {
      callAirtable()
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
        <motion.div
          className="top-8 relative opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {
            loading ? (
              <Loading>Loading</Loading>
            )
            : (
              <EventList events={state}/>
            )
          }
        </motion.div>
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
