import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import { LinkCard, AnchorCard } from '@components/ListItem'
import { LatestHangout } from '@components/Hangouts'
import Box, { BoxLink } from '@components/Box'
import useHover from '@utils/useHover'

const AbsoluteImages = () => {

  const images = [
    {
      type: 'triangle',
      classes: 'w-28 -z-3 rotate-45 filter blur -top-12 left-48'
    }, {
      type: 'diamond',
      classes: 'w-20 md:w-36 -z-3 filter blur -bottom-2/3 -left-16 md:-left-20'
    }, {
      type: 'oval',
      classes: 'w-32 md:w-40 -z-3 filter blur z-10 -bottom-96 right-48'
    }, {
      type: 'pentagon',
      classes: 'w-20 md:w-32 z-10 filter blur -bottom-full left-32'
    }, {
      type: 'quarter',
      classes: 'rotate-12 w-24 -z-3 filter blur -bottom-12 right-36'
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
            animate={{ opacity: .1 }}
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
  const [hoverRef, isHovered] = useHover()

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
              className="transition relative transform col-span-2 lg:col-span-3 top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24 }}
            >
              <AbsoluteImages/>
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
              <LinkCard
                href={'/slack'}
                tint={'yellow'}
                label={'Chat on Slack'}
                type={'slack'}
              />
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 0.7 }}
            >
              <LinkCard
                href={'/groups'}
                tint={'red'}
                label={'Explore Groups'}
                type={'groups'}
              />
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0 flex row-span-2 col-span-2 sm:col-span-1"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 0.9 }}
            >
              <BoxLink href="/about" p={'0'} mb={'0'} mt={'0'} rotate={2}>
                <span
                  className="inline-flex items-center transition text-white py-1 px-2 bg-black bg-opacity-60 rounded-full text-xs absolute top-2 right-2 z-10 select-none"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1"></span>
                  {isRandom.artist}
                </span>
                <div ref={hoverRef} className="select-none flex relative flex-col-reverse h-full pt-16 pb-8 sm:pt-8 px-4">
                  <div className="relative z-10 text-white dark:text-white">
                    <h5 className='text-base md:text-base xl:text-xl text-white'>About</h5>
                    <p className="text-xs md:text-sm mt-0 mb-0">Learn more about this project</p>
                  </div>
                  <div
                    className={`absolute transition top-0 left-0 bottom-0 right-0 z-0 filter ${isHovered ? 'blur-sm brightness-75 contrast-125' : 'blur-none'}`}
                    style={{
                      backgroundImage: `url('/static/${isRandom.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                  </div>
                  <div className="select-none bg-gradient-to-b z-5 from-transparent to-black opacity-90 absolute top-1/4 left-0 bottom-0 right-0"></div>
                </div>
              </BoxLink>
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 1 }}
            >
              <LinkCard
                href={'/events'}
                tint={'blue'}
                label={'Find an event'}
                type={'events'}
              />
            </motion.div>
            <motion.div
              className="transition relative transform top-4 opacity-0"
              animate={{ opacity: 1, top: 0 }}
              transition={{ duration: 0.24, delay: 1.2 }}
            >
              <AnchorCard
                href={'https://github.com/srhzt/tampabaydesigners'}
                tint={'indigo'}
                label={'Contribute'}
                type={'interviews'}
              />
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
