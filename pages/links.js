import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import EmptyState from '@components/EmptyState'


const Links = ({ title, description, ...props }) => {

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
          title={'Links'}
          subtitle={'Find designers in the area or checkout one of the curated resources from the list below!'}
        />
        <motion.section
          className="relative top-4 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <EmptyState>
            Coming soon...
          </EmptyState>
          <div className="block text-center mb-8 mt-8">
            <p className="text-custom-orange dark:text-custom-yellow mb-2">
              <small>
                Do you want to add a designer to the list directory? Have a link to share?
              </small>
            </p>
            <a className="button button--secondary" href="mailto:tampabaydesigners@gmail.com">Share a Link!</a>
          </div>
        </motion.section>
      </Layout>
    </>
  )
}

export default Links

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
