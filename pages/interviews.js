import React from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Box from '@components/Box'

const Interviews = ({ title, description, ...props }) => {

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
          <h1>Interviews</h1>
          <p className="lead">
            Taking a look into the craft, passions, and backgrounds of designers in the Tampa Bay area
          </p>
          <Box>
            <div className="text-center py-4">
              <h1 className="mt-0 mb-2">🚀</h1>
              <span className="mt-0 mb-2 uppercase tracking-widest text-sm">Coming Soon</span>
            </div>
          </Box>
        </div>
      </section>
    </Layout>
  )
}

export default Interviews

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
