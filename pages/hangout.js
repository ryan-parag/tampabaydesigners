import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import Divider from '@components/Divider'
import Form from '@components/SurveyForm/Form'
import Link from 'next/link'
import { BoxOutbound, BoxNew } from '@components/Box'
import { Bookmark } from 'react-feather'


const Page = ({ title, description, ...props }) => {

  const resources = [
    {
      link: 'https://medium.com/flowhack/how-to-create-a-ux-portfolio-without-any-work-experience-fb23236e3b1e',
      description: 'A mentor’s guide to creating a portfolio that gets your first UI/UX designer job',
      name: 'How to create a UX design portfolio without work experience'
    },{
      link: 'https://blog.uxfol.io/ux-portfolio-presentation/',
      description: 'How to Structure and Present Your UX Portfolio on a Job Interview',
      name: 'UX Portfolio Presentation'
    },{
      link: 'https://www.invisionapp.com/inside-design/review-ux-portfolio/',
      description: 'If the first time you ask for feedback about your UX portfolio is after a job interview, then you’re doing it wrong. ',
      name: 'Why you need someone to review your UX portfolio'
    }
  ]

  return (
    <>
      <Layout ogImage={'/hangout-sm.png'} pageTitle={`${title} | Design Hangouts`} description={description}>
        <Title
          title={'Design Hangouts'}
          subtitle={'Getting designers together is a guaranteed good time. You’ll be able to mingle and meet other designers in Tampa/St. Pete area!'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Subtitle>Hey, we're doing this at the beginning of every month!</Subtitle>
          <p className="mb-4 text-sm">
            Let's get together on the first Tuesday of every month somewhere around the Tampa/St. Pete area - join your fellow designers as we grab some drinks, talk shop, or whatever else comes to mind.
          </p>
          <Subtitle>Here’s what you can expect:</Subtitle>
          <div className="grid gap-4 grid-col-1 sm:grid-cols-2">
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">👯‍♀️</div>
                <p className="text-sm"><strong>Meet and Greet</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">👩‍🏫</div>
                <p className="text-sm"><strong>Show & Tell</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">✋</div>
                <p className="text-sm"><strong>Portfolio Review / Discussion</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍💼</div>
                <p className="text-sm"><strong>Job Stuff</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍🎉</div>
                <p className="text-sm"><strong>Great Atmosphere</strong></p>
              </div>
            </BoxNew>
            <BoxNew>
              <div className="flex items-center">
                <div className="text-3xl w-12 pr-4 inline-block">‍🤷‍♀️</div>
                <p className="text-sm"><strong>Group Discussions</strong></p>
              </div>
            </BoxNew>
          </div>
        </motion.section>
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
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
