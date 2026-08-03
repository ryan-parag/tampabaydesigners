import React from 'react'
import FadeIn from '@components/FadeIn'
import Layout from '@components/Layout'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { ListGroupItem } from '@components/ListItem'
import { Error, Loading, Empty } from '@components/DataStates'

const Slack = ({ title, description, ...props }) => {

  const { data, error, mutate } = useSWR('/api/slack', fetcher);

  return (
    <Layout pageTitle={'Slack Groups'} description={description} ogImage={'/tbd-sm.png'}>
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
              error ? (
                <Error onRetry={() => mutate()}/>
              )
              : !data ? (
                <Loading/>
              )
              : data.groups.length === 0 ? (
                <Empty>
                  No communities yet - check back soon
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
