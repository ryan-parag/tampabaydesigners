import React from 'react'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import Link from 'next/link'

const Page = ({ title, description, ...props }) => {

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
          <div className="relative">
            <motion.div
              className="transform card w-50 opacity-0 top-4"
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-6xl mb-4">😩</div>
              <h1 className="mt-0">Sorry, page not found</h1>
              <p className="mb-6">Try a different starting point by heading back to the main page</p>
              <Link href="/">
                <a className="button">Back Home</a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
