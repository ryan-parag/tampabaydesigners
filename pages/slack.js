import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import Title, { Subtitle } from '@components/Title'
import SlackGroup from '@components/SlackGroup'
import { motion } from 'framer-motion'
import AirtablePlus from 'airtable-plus'

const Slack = ({ title, description, data, ...props }) => {

  const [listedItems, setListedItems] = useState(data)

  useEffect(() => {

  }, [])

  return (
    <>
      <Layout ogImage={'/tbd-sm.png'} pageTitle={`${title} | Slack`} description={description}>
        <Title
          title={'Slack Communities'}
          subtitle={'Discuss trends, give advice, share feedback, look for new opportunities, and more inside one of the local Slack communities.'}
        />
        <Subtitle>Find a community from the list below:</Subtitle>
       <div>
         {
           listedItems.map((group, i) => (
             <SlackGroup
              delay={i}
              name={group.fields.Name}
              img={group.fields.Attachments[0].url}
              description={group.fields.Description}
              link={group.fields.Link}
              key={i}
             />
           ))
         }
       </div>
        <motion.div
          className="block text-center mb-8 opacity-0 top-8"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Want to customize your Slack theme?
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://slack-themes.now.sh/">Find one on Slack Themes!</a>
        </motion.div>
      </Layout>
    </>
  )
}

export default Slack

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'slack',
  });

  const data = await airtable.read({
    filterByFormula: 'Verified'
  });

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      data: data,
    },
  }
}
