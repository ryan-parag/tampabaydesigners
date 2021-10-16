import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import ListItem from '@components/ListItem'
import { LatestHangout } from '@components/Hangouts'
import styled from 'styled-components'
import Box, { BoxLink } from '@components/Box'
import { Avatar } from '@components/PageIcon'

const AbsoluteImages = () => {

  const images = [
    {
      type: 'triangle',
      classes: 'w-28 -z-3 rotate-45 filter blur-sm -top-12 left-48'
    }, {
      type: 'diamond',
      classes: 'w-32 md:w-48 -z-3 filter blur-sm top-1/3 -left-14 md:-left-20'
    }, {
      type: 'oval',
      classes: 'w-32 md:w-40 z-10 -top-16 md:-top-20 left-28'
    }, {
      type: 'pentagon',
      classes: 'w-32 md:w-40 z-10 -top-16 -right-16'
    }, {
      type: 'quarter',
      classes: 'rotate-12 w-24 -z-3 filter blur-sm -bottom-12 right-36'
    }
  ]
  return(
    <>
      {
        images.map((item, i) => (
          <motion.img
            key={i}
            src={`static/${item.type}.png`}
            className={`transform absolute opacity-0 select-none ${item.classes}`}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3*i }}
          />
        ))
      }
    </>
  )
}

const Index = ({ title, description, ...props }) => {

  const gifs = [
    {
      img: 'bg.gif',
      artist: 'KidMograph'
    }, {
      img: 'bg-2.gif',
      artist: 'KidMograph'
    }, {
      img: 'bg-3.gif',
      artist: 'VisualDon'
    }
  ]

  const randomFact = () => {
    let random = gifs[Math.floor(Math.random() * gifs.length)]
    return random
  }

  const [isRandom, setIsRandom] = useState('')

  useEffect(() => {
    setIsRandom(randomFact())
  }, [])

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
      className="relative pt-24 lg:pt-40 pb-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <motion.div
              className="transition transform col-span-2 lg:col-span-3 top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24 }}
            >
              <Box p={'0'} mb={'0'} mt={'0'}>
                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl xl:text-5xl mt-0">Discover design communities in the Tampa Bay area!</h1>
                  <p>New to the Tampa Bay/St. Pete design community?</p>
                  <p>Find a slack group, check out upcoming events, look for ways to get feedback, and much more using one of the links below.</p>
                </div>
              </Box>
            </motion.div>
            <div className="col-span-2 lg:col-span-3">
              <LatestHangout/>
            </div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 0.4 }}
            >
              <BoxLink href="/slack" p={'0'} mb={'0'} mt={'0'} tint={'yellow'}>
                <div className="flex flex-col text-center items-center py-8 px-4">
                  <Avatar type="slack" mb={'4'} />
                  <h5 className='text-base md:text-base xl:text-xl'>Join Slack Groups</h5>
                </div>
              </BoxLink>
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 0.7 }}
            >
              <BoxLink href="/groups" p={'0'} mb={'0'} mt={'0'} tint={'red'}>
                <div className="flex flex-col text-center items-center py-8 px-4">
                <Avatar type="groups" mb={'4'} />
                  <h5 className='text-base md:text-base xl:text-xl'>Explore Communities</h5>
                </div>
              </BoxLink>
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0 flex row-span-2 col-span-2 sm:col-span-1"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 0.9 }}
            >
              <BoxLink href="/about" p={'0'} mb={'0'} mt={'0'}>
                <span
                  className="transition text-white py-1 px-2 bg-black bg-opacity-60 rounded text-xs absolute top-2 right-2 z-10"
                  target="_blank"
                >
                  {isRandom.artist}
                </span>
                <div className="flex relative flex-col-reverse h-full pt-16 pb-8 sm:pt-8 px-4">
                  <div className="relative z-10 text-white dark:text-white">
                    <h5 className='text-base md:text-base xl:text-xl text-white'>About</h5>
                    <p className="text-xs md:text-sm mt-0 mb-0">Learn more about this project</p>
                  </div>
                  <div
                    className="absolute top-0 left-0 bottom-0 right-0 z-0"
                    style={{
                      backgroundImage: `url('/static/${isRandom.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                  </div>
                  <div className="bg-gradient-to-b z-5 from-transparent to-black via-black opacity-50 absolute top-0 left-0 bottom-0 right-0"></div>
                </div>
              </BoxLink>
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 1 }}
            >
              <BoxLink href="/events" p={'0'} mb={'0'} mt={'0'} tint={'blue'}>
                <div className="flex flex-col text-center items-center py-8 px-4">
                  <Avatar type="events" mb={'4'} />
                  <h5 className='text-base md:text-base xl:text-xl'>Find an event</h5>
                </div>
              </BoxLink>
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 1.2 }}
            >
              <BoxLink href="/interviews" p={'0'} mb={'0'} mt={'0'} tint={'indigo'}>
                <div className="flex flex-col text-center items-center py-8 px-4">
                  <Avatar type="interviews" mb={'4'}/>
                  <h5 className='text-base md:text-base xl:text-xl'>Designer Interviews</h5>
                </div>
              </BoxLink>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
