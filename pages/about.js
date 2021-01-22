import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Chip from '@components/Chip'
import Title, { Subtitle } from '@components/Title'
import { Mail, GitHub } from 'react-feather'
import Divider from '@components/Divider'


const About = ({ title, description, ...props }) => {

  const skills = [
    {
      name: 'UI Design',
      color: 'red'
    }, {
      name: 'UX Design',
      color: 'blue'
    }, {
      name: 'Illustration',
      color: 'pink'
    }, {
      name: 'Front-end Development',
      color: 'green'
    }, {
      name: 'Copywriting',
      color: 'indigo'
    }
  ]


  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description}>
        <Title
          title={'About'}
          subtitle={'This space is used to collect information about all of the events and groups from each of the design organizations in the Tampa Bay/St. Pete area!'}
        />
        <motion.section
          className="relative top-4 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Subtitle>Have a question?</Subtitle>
          <p className="mb-4 text--secondary">We’d love to help! Email over a question and we'll either answer, if possible, or direct you towards someone in the community who can. We'll do our best to reply quickly 👍.</p>
          <a className="button button--primary mb-8" href="mailto:tampabaydesigners@gmail.com">
            <span className="mr-2">Send an Email</span>
            <Mail size={'20'}/>
          </a>
        </motion.section>
        <Divider/>
        <motion.section
          className="relative top-4 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Subtitle>Want to contribute?</Subtitle>
          <p className="mb-2 text--secondary">Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
          <p className="mb-4 text--secondary">We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
          <div className="mb-4">
            <div className="text-xs text-black text-opacity-50 dark:text-white dark:text-opacity-50 mb-2">Have skills in one or more of the following?</div>
            <div className="flex flex-wrap">
              {
                skills.map((skill, i) => (
                  <Chip marginRight key={i} type={skill.color}>
                    {skill.name}
                  </Chip>
                ))
              }
            </div>
          </div>
          <a className="button button--primary mb-8" href="https://github.com/TampaBayDesigners/tampabaydesigners">
            <span className="mr-2">Send us a message</span>
            <GitHub size={'20'}/>
          </a>
        </motion.section>
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
