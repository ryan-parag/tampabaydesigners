import React from 'react'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { SlackGroup } from '@components/ListItem'
import { Error, Loading } from '@components/DataStates'

const Slack = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/slack', fetcher);

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
        className="pt-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <h1>Slack Groups</h1>
          <p className="lead">
            Discuss trends, give advice, share feedback, look for new opportunities, and more inside one of the local Slack or Discord communities.
          </p>
          <ul className="pt-4">
            <li>
              <h5>Find a community from the list below:</h5>
            </li>
            {
              error && (<Error/>)
            }
            {
              data ? (
                data.groups.map((item,i) => (
                  <motion.li
                    key={item.id}
                    className="opacity-0 top-4 relative"
                    animate={{ top: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3*i }}
                  >
                    <SlackGroup data={item} />
                  </motion.li>
                ))
              )
              :
              (
                <Loading/>
              )
            }
          </ul>
        </div>
      </section>
      <section
        className="py-16 flex items-start lg:items-center w-full overflow-x-hidden"
      >
        <div className="container text-center p-3 mx-auto lg:w-1/2">
          <p>Want to customize your Slack theme?</p>
          <a
            href="https://slack-themes.vercel.app/"
            target="_blank"
            className="button button--yellow"
          >
            Find one on Slack Themes
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default Slack

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
