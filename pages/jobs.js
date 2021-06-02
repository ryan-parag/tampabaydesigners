import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import Title, { Subtitle } from '@components/Title'
import { motion } from 'framer-motion'
import AirtablePlus from 'airtable-plus'
import EmptyState from '@components/EmptyState'
import { BoxOutbound } from '@components/Box'
import { Briefcase } from 'react-feather'
import moment from 'moment'
import Link from 'next/link'
import JobForm from '@components/JobForm'

const Jobs = ({ title, description, data, ...props }) => {

  const filtered = data.filter(item => {
    const check = !moment(item.fields.Submitted).isBefore(moment().subtract(3, 'months'))
    return check
  })
  const [listedItems, setListedItems] = useState(filtered)

  useEffect(() => {
    console.log(listedItems)
  }, [])

  return (
    <>
      <Layout ogImage={'/tbd-sm.png'} pageTitle={`${title} | Slack`} description={description}>
        <Title
          title={'Jobs'}
          subtitle={'Having trouble finding a design opportunity in Florida? Look through the list of open positions.'}
        />
        <Subtitle>Found {listedItems.length} open position{listedItems.length !== 1 ? 's' : null} in Florida:</Subtitle>
       {
         listedItems.length > 0 ? (
          <>
            <div className="mb-4 text--secondary text-xs">Last 3 months ({moment().subtract(3, 'months').format('MMM YYYY')})</div>
            <div>
              {
                listedItems.map((item, i) => (
                  <motion.div
                    className="top-8 relative opacity-0 mb-4"
                    animate={{ top: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.02*i }}
                    key={i}
                  >
                    <BoxOutbound
                      href={item.fields.Link}
                      target="_blank"
                      flex
                    >
                      <div className="flex">
                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 bg-opacity-20 text-green-500`}>
                          <Briefcase size={'20'}/>
                        </div>
                      </div>
                      <div className="flex-col sm:flex-row flex-1 flex justify-between pl-4">
                        <div>
                          <div className="font-bold mb-2">{item.fields.Role}</div>
                          <div className="mb-2 sm:mb-0 text-sm text--secondary">{item.fields.Company}</div>
                        </div>
                        <div>
                          <div className="text-sm text--secondary">{item.fields.Location}{' '}{item.fields.Remote ? '(Remote)' : null}</div>
                        </div>
                      </div>
                    </BoxOutbound>
                  </motion.div>
                ))
              }
            </div>
            <p className="mt-4 text--secondary text-sm">
              If any of these positions are no longer available,{' '}
              <a href="mailto:tampabaydesigners@gmail.com">let us know</a>!
            </p>
          </>
         )
         :
         (
           <EmptyState>
             No open jobs in Florida
           </EmptyState>
         )
       }
       <p className="mt-4 text--secondary text-sm">
          🎉Submit your portfolio to the Designer Directory to help get matched to open roles{' '}
          <Link href="/links/designers">Submit your portfolio</Link>
        </p>
        <JobForm/>
      </Layout>
    </>
  )
}

export default Jobs

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'jobs',
  });

  const data = await airtable.read({
    filterByFormula: `AND(Verified,Open)`,
    sort: [{field: 'Submitted', direction: 'asc'}]
  });

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      data: data,
    },
  }
}
