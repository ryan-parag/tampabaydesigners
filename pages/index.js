import Layout from '@components/Layout'
import Link from 'next/link'
import { BoxOutbound } from '@components/Box'
import Title, { Subtitle } from '@components/Title'
import { ChipLink } from '@components/Chip'
import { motion } from 'framer-motion'
import Divider from '@components/Divider'
import groups from '@data/groups'

const ListItem = ({delay, link, img, title, description}) => {

  const itemDelay = 0.3 * (delay + 1)
  return(
    <motion.div
      className="relative top-4 opacity-0"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: itemDelay }}
    >
      <BoxOutbound
        marginBottom={'4'}
        target="_blank"
        href={link}
      >
        <div className="grid grid-cols-8 md:grid-cols-12">
          <div className="col-span-1">
            <div className="w-full rounded-full border-2 dark:border-white dark:border-opacity-10">
              <img
                className="block w-full rounded-full"
                src={img}
                alt={title}
              />
            </div>
          </div>
          <div className="pl-4 col-span-7 md:col-span-11">
            <p className="text-sm mb-1 font-bold">{title}</p>
            <p className="text-xs text-black text-opacity-70 dark:text-white dark:text-opacity-70">{description}</p>
          </div>
        </div>
      </BoxOutbound>
    </motion.div>
    
  )
}

const Index = ({ title, description, ...props }) => {

  const links = [
    {
      name: 'Explore Communities',
      color: 'blue',
      href: '/#events'
    }, {
      name: 'Join Slack Groups',
      color: 'yellow',
      href: '/slack'
    }, {
      name: 'Attend Events',
      color: 'pink',
      href: '/events'
    }, {
      name: 'Search for Open Roles',
      color: 'green',
      href: '/slack'
    }, {
      name: 'Share Feedback',
      color: 'red',
      href: '/slack'
    }, {
      name: 'Learn About Design',
      color: 'indigo',
      href: '/slack'
    }
  ]


  return (
    <>
      <Layout pageTitle={title} description={description}>
        <Title
          title={'Discover design communities in the Tampa Bay area!'}
          subtitle={'New to the Tampa Bay/St. Pete design community?'}
        />
        <div className="flex justify-center flex-wrap mb-8">
          {
            links.map((link, i) => (
              <motion.div
                className="top-8 opacity-0 transform scale-75 inline-block"
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.12*i }}
                key={link.name}
              >
                <Link href={link.href}>
                  <a>
                    <ChipLink
                      type={link.color}
                      marginLeft
                      marginRight
                      marginBottom
                    >
                      {link.name}
                    </ChipLink>
                  </a>
                </Link>
              </motion.div>
            ))
          }
        </div>
        <Divider/>
        <div id="events">
          <Subtitle>Our local design communities:</Subtitle>
        </div>
        {
          groups.map((group,i) => (
            <ListItem
              delay={i}
              img={group.img}
              title={group.name}
              link={group.link}
              key={group.name}
              description={group.description}
            />
          ))
        }
        <div className="block text-center mb-8">
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Don't see your group listed?
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSddTfmh1Gn4U-olwwrVgkFyV8YQakBmouImmhASQcoACqUeZQ/viewform?usp=sf_link">Fill out the form</a>
        </div>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
