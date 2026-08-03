import React from 'react'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import FadeIn from '@components/FadeIn'
import { ListGroupItem } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'

const Groups = ({ title, description, ...props }) => {

  const { data, error, mutate } = useSWR('/api/groups', fetcher);

  return (
    <Layout pageTitle={'Groups'} description={description} ogImage={'/tbd-sm.png'}>
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
              error ? (
                <Error onRetry={() => mutate()}/>
              )
              : !data ? (
                <Loading/>
              )
              : data.groups.length === 0 ? (
                <Empty>
                  No groups yet - check back soon
                </Empty>
              )
              : (
                data.groups.map((item,i) => (
                  <FadeIn
                    as={'li'}
                    key={item.id}
                    className="relative"
                    delay={Math.min(0.08*i, 0.4)}
                  >
                    <ListGroupItem data={item} />
                  </FadeIn>
                ))
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
