import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '@components/Layout'
import getSlugs from '@utils/getSlugs'
import moment from 'moment'
import Divider from '@components/Divider'
import Chip from '@components/Chip'
import { Globe, Twitter } from 'react-feather'
import { motion } from 'framer-motion'

const Title = ({photo, name, description, role, link, twitter, date}) => {
  return (
    <>
      <div className="flex">
        <Link href="/interviews"><a className="link text--secondary">&larr; Interviews</a></Link>
        <span className="mx-2 text--secondary">/</span>
        <span className="font-bold">{name}</span>
      </div>
      <Divider/>
      <motion.div
        className="top-8 opacity-0 relative flex flex-col md:flex-row items-start"
        animate={{ top: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img src={photo} className="w-24 h-24 rounded-full mb-4 md:mb-0"/>
        <div className="flex-1 md:pl-4">
          <div className="mb-4 text-sm text--secondary font-mono">{moment(date, 'YYYY-MM-DD').format('dddd, MMMM, Do YYYY')}</div>
          <h1 className="text-3xl md:text-5xl font-black mt-0 mb-4">{name}</h1>
          <div className="flex items-center">
            <Chip type="yellow">{role}</Chip>
            {
              link ? (
                <a aria-label="Website" href={link} className="transform transition hover:scale-110 mx-2 w-10 h-10 inline-flex items-center justify-center rounded-full">
                  <Globe size="24"/>
                </a>
              )
              :
              null
            }
            {
              twitter ? (
                <a aria-label="Twitter" href={`https://twitter.com/${twitter}`} className="transform transition hover:scale-110 w-10 h-10 inline-flex items-center justify-center rounded-full">
                  <Twitter size="24"/>
                </a>
              )
              :
              null
            }
          </div>
          <p className="font-mono text-sm md:text-lg mt-4 mb-4 text--secondary">{description}</p>
        </div>
      </motion.div>
      <Divider/>
    </>
  )
}

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
    <>
      <Layout pageTitle={`${frontmatter.name} | ${siteTitle}`} description={frontmatter.description}>
        <Title
          name={frontmatter.name}
          description={frontmatter.description}
          role={frontmatter.role}
          link={frontmatter.url}
          photo={frontmatter.photo}
          twitter={frontmatter.twitter}
          date={frontmatter.date}
        />
        <motion.article
          className="interview top-8 opacity-0 relative"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div>
            <ReactMarkdown
              source={markdownBody}
            />
          </div>
        </motion.article>
        <hr/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../../interviews/${postname}.md`)
  const config = await import(`../../siteconfig.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
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