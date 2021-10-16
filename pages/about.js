import React from 'react'
import Layout from '@components/Layout'
import Box from '@components/Box'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Loading, Error } from '@components/DataStates'
import { motion } from 'framer-motion'
import { Credit } from '@components/ListItem'

const About = ({ title, description, ...props }) => {

  const { data, error } = useSWR('/api/credits', fetcher);

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
          <h1>About</h1>
          <p className="lead mb-12">
          This space is used to organize the information about all of the events and groups from each of the design organizations in the Tampa Bay/St. Pete area!
          </p>
          <Box mb={'12'} p={'6'}>
            <h3>Have a question?</h3>
            <p>We’d love to help! Email over a question and we'll either answer, if possible, or direct you towards someone in the community who can. We'll do our best to reply quickly 👍.</p>
            <a className="button" href="mailto:tampabaydesigners@gmail.com">Send an Email</a>
          </Box>
          <Box mb={'12'} p={'6'}>
            <h3>Want to contribute?</h3>
            <p>Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
            <p>We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
            <p>
              <small>Have skills in one or more of the following?</small>
            </p>
            <ul className="flex flex-wrap">
              {
                skills.map((item,i) => (
                  <li key={i}>
                    <span
                      className={`mr-1 my-2 rounded-full inline-flex items-center text-xs tracking-wide py-1 px-3 border bg-white bg-opacity-100 shadow dark:bg-white dark:bg-opacity-10 dark:border-opacity-10 text-black text-opacity-100 dark:text-white dark:text-opacity-100`}
                    >
                      <span class="flex h-2 w-2 relative items-center justify-center mr-2">
                        <span class={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${item.color}-500 opacity-30`}></span>
                        <span class={`relative inline-flex rounded-full h-2 w-2 bg-${item.color}-500`}></span>
                      </span>
                      {item.name}
                    </span>
                  </li>
                ))
              }
            </ul>
            <a className="mt-4 button" href="https://github.com/TampaBayDesigners/tampabaydesigners">Send us a message</a>
          </Box>
          <h3>Credits</h3>
          <ul>
            {
              error && (<Error/>)
            }
            {
              data ? (
                data.credits.map((item,i) => (
                  <motion.li
                    key={item.id}
                    className="opacity-0 top-4 relative"
                    animate={{ top: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3*i }}
                  >
                    <Credit data={item}/>
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