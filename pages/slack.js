import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import Title, { Subtitle } from '@components/Title'
import SlackGroup from '@components/SlackGroup'
import Airtable from 'airtable'

const Slack = ({ title, description, ...props }) => {

  const [listedItems, setListedItems] = useState([])

  const groupsArr = []

  const getData = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    base('slack').select({
      view: 'Grid view',
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let verified = record.get('Verified')
        if(verified) {
          let group = {
            name: record.get('Name'),
            description: record.get('Description'),
            href: record.get('Link'),
            image: record.get('Attachments')[0].url,
          }
          groupsArr.push(group)
        }
      })
      setListedItems(groupsArr)
    }, function done(err) {
      if( err) { console.log(err); return; }
    })
  }

  useEffect(() => {

    getData()

  }, [])

  return (
    <>
      <Layout pageTitle={`${title} | Slack`} description={description}>
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
              name={group.name}
              img={group.image}
              description={group.description}
              link={group.href}
              key={group.name}
             />
           ))
         }
       </div>
        <div className="block text-center mb-8">
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Want to customize your Slack theme?
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://slack-themes.now.sh/">Find one on Slack Themes!</a>
        </div>
      </Layout>
    </>
  )
}

export default Slack

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}
