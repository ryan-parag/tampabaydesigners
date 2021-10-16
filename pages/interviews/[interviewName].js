import React from 'react'
import Layout from '@components/Layout'
import matter from 'gray-matter'
import getSlugs from '@utils/getSlugs'
import moment from 'moment'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'

const ButtonLink = ({href, children}) => {
  return(
    <a
      href={href}
      title={href}
      className="rounded py-1 px-2 text-sm transition backdrop-blur bg-black dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-20 bg-opacity-5 hover:bg-opacity-10 inline-flex items-center mr-4"
    >
      {children}
    </a>
  )
}

const Page = ({ siteTitle, frontmatter, markdownBody, description }) => {

  return (
    <Layout pageTitle={siteTitle} description={description} ogImage={'/tbd-sm.png'}>
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
          <div className="flex mb-8">
            <Link href="/interviews">
              <a className="hover:underline">Interviews</a>
            </Link>
            <span className="mx-2">/</span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <motion.div
              className="card relative w-36 h-36 mr-8 opacity-0"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundImage: `url(../${frontmatter.hero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-red-500 opacity-20"></div>
            </motion.div>
            <motion.div
              className="relative flex flex-1 flex-col items-center md:items-start opacity-0 -left-4 mt-4 md:mt-0 text-center md:text-left"
              animate={{ opacity: 1, left: 0}}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <p className="mt-0 mb-2 text-sm">
                {moment(frontmatter.date).format('MMM DD, YYYY')}
              </p>
              <h1 className="my-0">{frontmatter.name}</h1>
              <p className="mt-2 mb-4 text-sm">{frontmatter.description}</p>
              <div className="flex">
                {
                  frontmatter.twitter && (
                    <ButtonLink
                      href={`https://twitter.com/${frontmatter.twitter}`}
                    >
                      @{frontmatter.twitter}
                    </ButtonLink>
                  )
                }
                {
                  frontmatter.website && (
                    <ButtonLink
                      href={frontmatter.website}
                    >
                      {frontmatter.website}
                    </ButtonLink>
                  )
                }
              </div>
            </motion.div>
          </div>
          <hr className="my-8 border-black dark:border-white border-opacity-20 dark:border-opacity-10"/>
          <motion.article
            className="opacity-0 top-4 relative prose"
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <ReactMarkdown
              children={markdownBody}
            />
          </motion.article>
        </div>
      </section>
    </Layout>
  )
}

export default Page

export async function getStaticProps({ ...ctx }) {
  const { interviewName } = ctx.params

  const content = await import(`../../interviews/${interviewName}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      description: config.description,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    return getSlugs(context)
  })(require.context('../../interviews', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/interviews/${slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}