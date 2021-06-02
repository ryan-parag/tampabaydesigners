import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import getPosts from '@utils/getPosts'
import InterviewList from '@components/InterviewList'
import { BoxNew } from '@components/Box'
import { Star } from 'react-feather'
import Link from 'next/link'

const Page = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return (
    <>
      <Layout ogImage={'./tbd-sm.png'} pageTitle={`${title} | Interviews`} description={description}>
        <Title
          title={'Interviews'}
          subtitle={'Taking a look into the craft, passions, and backgrounds of designers in the Tampa Bay area'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {
            sortedPosts.length < 2 ? (
              <BoxNew center>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 bg-opacity-20 text-green-500 mb-4`}>
                  <Star size={'24'}/>
                </div>
                <div>Coming Soon!</div>
              </BoxNew>
            )
            :
            (
              <InterviewList interviews={sortedPosts}/>
            )
          }
          <div className="text-center mt-8">
            <Link href={'/interviews/nominate'}><a className="button button--primary">Want to be interviewed?</a></Link>
          </div>
        </motion.section>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../../interviews', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
