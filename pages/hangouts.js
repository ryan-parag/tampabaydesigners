import React, { useState } from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { motion } from 'framer-motion'
import { Error, Loading } from '@components/DataStates'
import Box from '@components/Box'
import { Form } from '@components/Hangouts'

const Hangouts = ({ title, description, ...props }) => {

  const descriptions = [
    {
      icon: '👯‍♀️',
      label: 'Meet and Greet'
    }, {
      icon: '👩‍🏫',
      label: 'Show & Tell'
    }, {
      icon: '✋',
      label: 'Portfolio Reviews'
    }, {
      icon: '‍💼',
      label: 'Job Stuff'
    }, {
      icon: '‍🎉',
      label: 'Great Atmosphere'
    }, {
      icon: '‍🤷‍♀️',
      label: 'Group Discussions'
    }
  ]

  const { data, error } = useSWR('/api/groups', fetcher);

  return (
    <Layout pageTitle={title} description={description} ogImage={'/hangout-sm.png'}>
      <section
        className="pt-8 pb-24 lg:pt-24 flex flex-col items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          className="container p-3 mx-auto lg:w-1/2 text-center"
        >
          <div className="w-full">
            <h1>Design Hangouts</h1>
            <p className="lead">
            Getting designers together is a guaranteed good time. You’ll be able to mingle and meet other designers in Tampa/St. Pete area!
            </p>
            <Form/>
            <h4>Here’s what you can expect:</h4>
            <ul className="flex flex-wrap py-4 items-center justify-center">
              {
                descriptions.map((item,i) => (
                  <motion.li
                    className="relative opacity-0 top-4"
                    key={i}
                    animate={{ opacity: 1, top: 0 }}
                    transition={{ duration: 0.3, delay: `${0.7 + 0.12*i}` }}
                  >
                    <span className="mx-2 my-2 inline-flex shadow items-center tracking-wider text-xs uppercase font-sans bg-white bg-opacity-50 dark:bg-white dark:bg-opacity-10 text-black text-opacity-70 dark:text-white dark:text-opacity-70 backdrop-blur rounded-full px-4 py-1">
                      <span className="mr-2 text-lg">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                  </motion.li>
                ))
              }
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Hangouts

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
