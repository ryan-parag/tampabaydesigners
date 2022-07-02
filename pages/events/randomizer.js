import React, { useState } from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Selects, RandomSection, Hero } from '@components/Randomizer';

const Page = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/hangout-locations', fetcher);

  const [region, setRegion] = useState('Tampa')
  const [generated, setGenerated] = useState(false)

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
          {
            generated ? (
              <RandomSection setGenerated={setGenerated} region={region} data={data} />
            )
            :
            (
              <div className="text-center flex flex-col items-center">
                <Hero/>
                <h1>Event Randomizer</h1>
                <p className="lead">
                Choose a region and let the randomizer select a hangout location!
                </p>
                <Selects active={region} setRegion={setRegion} />
                <button onClick={() => setGenerated(true)} className="button button--primary">Get Random Location</button>
              </div>
            )
          }
        </div>
      </section>
    </Layout>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}