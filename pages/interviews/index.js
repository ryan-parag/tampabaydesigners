import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import { BoxNew } from '@components/Box'
import { MessageSquare } from 'react-feather'


const Page = ({ title, description, ...props }) => {

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
          <BoxNew center>
            <div className="text-center mb-4">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-10 dark:bg-opacity-20 dark:bg-white text-black dark:text-white`}>
                <MessageSquare size="20"/>
              </div>
            </div>
            Coming Soon
          </BoxNew>
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
