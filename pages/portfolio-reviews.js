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
      <Layout ogImage={'./tbd-sm.png'} pageTitle={`${title} | Portfolio Reviews`} description={description}>
        <Title
          title={'Portfolio Reviews'}
          subtitle={'Are you looking to receive feedback on your portfolio or chat with other local designers about their portfolios? Fill out the form!'}
        />
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Form/>
        </motion.section>
        <Divider/>
        <motion.section
          className="relative top-4 opacity-0 pt-2"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Subtitle>Helpful Resources</Subtitle>
          <p className="text--secondary text-sm mb-4">🎉 Lurk on other local designer portfolios or submit your own portfolio to the Designer Directory to help get matched to open roles - {' '}
            <Link href="/links/designers">Check it out</Link>!</p>
          {
            resources.map((item, i) => (
              <div key={i} className="mb-4">
                <BoxOutbound flex href={item.link}>
                  <div className="flex">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 bg-opacity-20 text-green-500`}>
                      <Bookmark size="20"/>
                    </div>
                  </div>
                  <div className="block flex-1 pl-4">
                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                    <span className="text--secondary text-xs">{item.description}</span>
                  </div>
                </BoxOutbound>
              </div>
            ))
          }
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
