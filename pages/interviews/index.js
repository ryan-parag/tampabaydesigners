import React from 'react'
import Layout from '@components/Layout'
import { Interview } from '@components/ListItem'
import Box from '@components/Box'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { motion } from 'framer-motion'
import moment from 'moment'

const Interviews = ({ interviews, title, description, ...props }) => {

  const filtered = interviews.filter(item => moment(item.frontmatter.date).isBefore(moment().format('YYYY-MM-DD')))

  const sorted = filtered.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
        className="pt-24 pb-24 flex flex-col"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <div className="text-center">
            <h1>Interviews</h1>
            <p className="lead">
              Taking a look into the craft, passions, and backgrounds of designers in the Tampa Bay area
            </p>
          </div>
          {
            sorted.length > 0 ? (
              <div>
                <hr className="mt-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 px-3"
                >
                  {
                    sorted.map((item,i) => (
                      <motion.div
                        key={i}
                        className="relative opacity-0 top-4"
                        animate={{ top: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2*i }}
                      >
                        <Interview
                          item={item}
                        />
                      </motion.div>
                    ))
                  }
                </div>
                <div className="flex flex-col items-center py-4">
                  <a href="mailto:tampabaydesigners@gmail.com" className="button">
                    Want to be interviewed?
                  </a>
                </div>
              </div>
            )
            :
            (
              <>
                <hr className="mt-8 mb-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
                <Box>
                  <div className="text-center py-4">
                    <h1 className="text-6xl mt-0 mb-4">🚀</h1>
                    <p className="mt-0 mb-4 uppercase tracking-widest text-sm">Coming Soon</p>
                    <a href="mailto:tampabaydesigners@gmail.com" className="button">
                      Want to be interviewed?
                    </a>
                  </div>
                </Box>
              </>
            )
          }
        </div>
      </section>
    </Layout>
  )
}

export default Interviews

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  const files = fs.readdirSync(path.join('interviews'))

  const interviews = files.map(filename => {
    const slug = filename.replace('.md','')
    const markdownWithMeta = fs.readFileSync(path.join('interviews', filename), 'utf-8')
    const {data:frontmatter} = matter(markdownWithMeta)
    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      interviews,
      title: configData.title,
      description: configData.description,
    },
  }
}