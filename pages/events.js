import Layout from '@components/Layout'
import Airtable from 'airtable'
import React, { useEffect,useState } from 'react'
import Event from '@components/Event'
import EmptyState from '@components/EmptyState'
import Title, { Subtitle } from '@components/Title'
import { motion } from 'framer-motion'
import Loading from '@components/Loading'
import groups from '@data/groups'
import AirtablePlus from 'airtable-plus'


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
                link={event.fields.Link}
                name={event.fields.Name}
                img={renderImg(event.fields.Org)}
                description={event.fields.Description}
                date={event.fields.Date}
                org={event.fields.Org}
                key={event.fields.Name}
              />
          )) :
          (
            <EmptyState type="default">
              No Upcoming Events
            </EmptyState>
          )
      }
    </div>
  )
}

const Events = ({ title, description, data, ...props }) => {
  const [state, setState] = useState(data)
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    console.log(data)
  }, [state])

  return (
    <>
      <Layout pageTitle={`${title} | Events`} description={description}>
        <Title
          title={'Upcoming Events'}
          subtitle={'Find an upcoming event to attend from the list below:'}
        />
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
        <motion.div
          className="block text-center mb-8 top-8 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Don't see an event listed or want to submit one?{' '}
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfXiL1a1f70HFyf0uXmQLscm30vMUxzgRoO1pnV8dz2PGBttA/viewform?usp=sf_link">Submit an event to be listed</a>
        </motion.div>
      </Layout>
    </>
  )
}

export default Events

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'events',
  });

  const data = await airtable.read({
    filterByFormula: `AND(Verified,Duration < 1)`,
    sort: [{field: 'Date', direction: 'asc'}]
  });

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      data: data,
    },
  }
}
