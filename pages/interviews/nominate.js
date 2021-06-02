import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import Form from '@components/InterviewList/Form'
import Link from 'next/link'

const Page = ({ title, description, ...props }) => {

  return (
    <>
      <Layout ogImage={'./tbd-sm.png'} pageTitle={`${title} | Want to be interviewed?`} description={description}>
        <div className="flex justify-center">
          <Link href="/interviews"><a className="link text--secondary">&larr; Interviews</a></Link>
          <span className="mx-2 text--secondary">/</span>
          <span className="font-bold">Nominate</span>
        </div>
        <Title
          title={'Want to be interviewed?'}
          subtitle={'Are you or someone you know a designer? Would you or someone you know like to share a bit of insight into your background, work, and perspective about design?'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Form/>
        </motion.section>
      </Layout>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
