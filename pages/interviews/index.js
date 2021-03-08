import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import getPosts from '@utils/getPosts'
import InterviewList from '@components/InterviewList'


const Page = ({ posts, title, description, ...props }) => {

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  return (
    <>
      <Layout pageTitle={`${title} | Interviews`} description={description}>
        <Title
          title={'Interviews'}
          subtitle={'Taking a look into the craft, passions, and backgrounds of designers in the Tampa Bay area'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <InterviewList interviews={sortedPosts}/>
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
