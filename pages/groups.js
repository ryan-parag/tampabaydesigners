import React from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { motion } from 'framer-motion'
import { Group } from '@components/ListItem'
import { Error, Loading } from '@components/DataStates'

const Groups = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/groups', fetcher);

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
        className="pt-24 pb-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <h1>Groups</h1>
          <p className="lead">
            Join one of our local design communities:
          </p>
          <ul>
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
                    <Group data={item} />
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
    </Layout>
  )
}

export default Groups

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
