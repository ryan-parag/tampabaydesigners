import React, { useState } from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Form } from '@components/Hangouts'
import FAQ from '@components/Hangouts/FAQ'

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

  const { data, error } = useSWR('/api/hangout-locations', fetcher);

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
            <FAQ/>
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
