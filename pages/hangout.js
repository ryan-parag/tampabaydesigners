import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import Divider from '@components/Divider'
import Form from '@components/SurveyForm/Form'
import Link from 'next/link'
import { BoxOutbound, BoxNew } from '@components/Box'
import AirtablePlus from 'airtable-plus'
import Event from '@components/Event'
import EmptyState from '@components/EmptyState'


const Page = ({ title, description, data, ...props }) => {

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
    <>
      <Layout ogImage={'/hangout-sm.png'} pageTitle={`${title} | Design Hangouts`} description={description}>
        <Title
          title={'Design Hangouts'}
          subtitle={'Getting designers together is a guaranteed good time. You’ll be able to mingle and meet other designers in Tampa/St. Pete area!'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Subtitle>Hey, we're doing this at the beginning of every month!</Subtitle>
          <p className="mb-4 text-sm">
            Let's get together on the first Tuesday of every month somewhere around the Tampa/St. Pete area:
          </p>
          <div className="mb-4">
            {
              data.length > 0 ? (
                <>
                  <p className="text-sm text--secondary mb-2">Next event:</p>
                  <Event
                    link={data[0].fields.Link}
                    name={data[0].fields.Name}
                    img={renderImg(data[0].fields.Org)}
                    description={data[0].fields.Description}
                    date={data[0].fields.Date}
                    org={data[0].fields.Org}
                    key={data[0].fields.Name}
                  />
                </>
              )
              :
              (
                <EmptyState>
                  Keep a lookout for the next scheduled hangout!
                </EmptyState>
              )
            }
          </div>
          <Subtitle>Here’s what you can expect:</Subtitle>
          <div className="grid gap-4 grid-col-1 sm:grid-cols-2">
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">👯‍♀️</div>
                <p className="text-sm"><strong>Meet and Greet</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">👩‍🏫</div>
                <p className="text-sm"><strong>Show & Tell</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">✋</div>
                <p className="text-sm"><strong>Portfolio Review / Discussion</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍💼</div>
                <p className="text-sm"><strong>Job Stuff</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍🎉</div>
                <p className="text-sm"><strong>Great Atmosphere</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍🤷‍♀️</div>
                <p className="text-sm"><strong>Group Discussions</strong></p>
              </div>
            </BoxNew>
          </div>
        </motion.section>
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Form/>
        </motion.section>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'events',
  });

  const data = await airtable.read({
    filterByFormula: `AND(Verified,Duration < 1,Name = "Design Hangout")`,
    sort: [{field: 'Date', direction: 'asc'}]
  });

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      data: data
    },
  }
}
