import React from 'react'
import Layout from '@components/Layout'
import Box from '@components/Box'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Loading, Error } from '@components/DataStates'
import FadeIn from '@components/FadeIn'
import { Credit } from '@components/ListItem'
import Tag from '@components/Tag'
import config from '../siteconfig.json'

const About = ({ title, description, ...props }) => {

  const { data, error, mutate } = useSWR('/api/credits', fetcher);

  const skills = [
    {
      name: 'UI Design',
      color: 'red'
    }, {
      name: 'UX Design',
      color: 'pink'
    }, {
      name: 'Illustration',
      color: 'green'
    }, {
      name: 'Front-end Development',
      color: 'blue'
    }, {
      name: 'Copywriting',
      color: 'indigo'
    }
  ]

  return (
    <Layout pageTitle={'About'} description={description} ogImage={'/tbd-sm.png'}>
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
          <h1>About</h1>
          <p className="lead mb-12">
          This space is used to organize the information about all of the events and groups from each of the design organizations in the Tampa Bay/St. Pete area!
          </p>
          <Box mb={'12'} p={'6'}>
            <h3>Have a question?</h3>
            <p>We’d love to help! Email over a question and we'll either answer, if possible, or direct you towards someone in the community who can. We'll do our best to reply quickly 👍.</p>
            <a className="button button--primary mt-4" href="mailto:tampabaydesigners@gmail.com">Send an Email</a>
          </Box>
          <Box mb={'12'} p={'6'}>
            <h3>Want to contribute?</h3>
            <p>Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
            <p>We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
            <p>
              <small>Have skills in one or more of the following?</small>
            </p>
            <ul className="flex flex-wrap mb-4">
              {
                skills.map((item,i) => (
                  <li key={i}>
                    <Tag
                      color={item.color}
                      mr={'2'}
                      mt={'2'}
                    >
                      {item.name}
                    </Tag>
                  </li>
                ))
              }
            </ul>
            <a className="button button--primary" href={config.githubUrl} target="_blank" rel="noopener noreferrer">Contribute on GitHub</a>
          </Box>
          <h3>Credits</h3>
          <ul>
            {
              error ? (
                <Error onRetry={() => mutate()}/>
              )
              : !data ? (
                <Loading/>
              )
              : (
                data.credits.map((item,i) => (
                  <FadeIn
                    as={'li'}
                    key={item.id}
                    className="relative"
                    delay={Math.min(0.08*i, 0.4)}
                  >
                    <Credit data={item}/>
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

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}