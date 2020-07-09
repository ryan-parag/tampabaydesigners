import Layout from '@components/Layout'
import Airtable from 'airtable'
import React, { useEffect,useState } from 'react'
import Event from '@components/Event'

const Meetups = ({ title, description, ...props }) => {

  const [state, setState] = useState([])
  const [unverified, setUnverified] = useState([])

  let newDate = new Date()
  let month = newDate.getMonth();

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
          let newEvent = {
            eventName:  record.get('Event Name'),
            org:  record.get('Org'),
            date: record.get('Date'),
            description: record.get('Description'),
            link: record.get('Link'),
          }
          designEvents.push(newEvent)
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

  const formatDate = date => {
    let d = new Date(date)
    let month = d.getMonth()
    let year = d.getFullYear()
    let day = d.getDay()
    return dayNames[day] + ', ' + monthNames[month] + ' ' + d.getDate() + ' ' + year
  }

  return (
    <>
      <Layout pageTitle={`${title} | Meetups`} description={description}>
        <h1>Meetups</h1>
        <p>It's {monthNames[month]} and we're still in the middle of a global pandemic - to help keep everyone safe, many meetups are being held via video conference.</p>
        <p>
          Attend an upcoming event from one of the local design communities:{' '}
          <strong style={{
            color: 'var(--green)'
          }}>Tampa Bay UX</strong>,{' '}
          <strong style={{
            color: 'var(--blue)'
          }}>Design St. Pete</strong>,{' '}
          <strong style={{
            color: 'var(--pink)'
          }}>Dribbble Tampa</strong>,{' '}
          <strong style={{
            color: 'var(--orange)'
          }}>Sketch Tampa</strong>, or{' '}
          <strong style={{
            color: 'var(--purple)'
          }}>Figma Tampa</strong>
        </p>
        <p>
          <small>
            Don't see an event listed or want to submit one?{' '}
            <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfXiL1a1f70HFyf0uXmQLscm30vMUxzgRoO1pnV8dz2PGBttA/viewform?usp=sf_link">Submit an event to be listed</a>
          </small>
        </p>
        {
          unverified.length > 0 ? (
            <div style={{
              padding: '24px',
              background: 'var(--red)',
              color: 'var(--white)',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              {unverified.length} event{unverified.length > 1 ? 's' : null} pending in Airtable
            </div>
          )
          :
          null
        }
        <div>
          {
            state.map(event => (
              <Event
                key={event.eventName}
                link={event.link}
                name={event.eventName}
                img={renderImg(event.org)}
                description={event.description}
                date={formatDate(event.date)}
                org={event.org}
              />
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export default Meetups

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}

/*
<div>
    {
      designEvents.map(event => (
        <div key={event.eventName}>
          <h4>{event.eventName}</h4>
          <span>{event.date}</span>
        </div>
      ))
    }
  </div>
  */