import Layout from '@components/Layout'
import Link from 'next/link'
import { BoxOutbound } from '@components/Box'
import Title from '@components/Title'
import { ChipLink } from '@components/Chip'
import { motion } from 'framer-motion'

const ListItem = ({delay, link, img, title, description}) => {

  const itemDelay = 0.3 * (delay + 1)
  return(
    <motion.div
      className="relative top-4 opacity-0"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: itemDelay }}
    >
      <BoxOutbound
        flex
        marginBottom={'4'}
        target="_blank"
        href={link}
      >
        <img className="h-12 w-12 rounded-full" src={img}/>
        <div className="pl-4">
          <p className="text-sm mb-1 font-bold">{title}</p>
          <p className="text-xs text-black text-opacity-70 dark:text-white dark:text-opacity-70">{description}</p>
        </div>
      </BoxOutbound>
    </motion.div>
    
  )
}

const Index = ({ title, description, ...props }) => {

  const groups = [
    {
      name: 'Tampa Bay UX',
      link: 'https://www.meetup.com/Tampabay-UX-Group/',
      img: '/tampa-bay-ux.png',
      description: 'The Tampa Bay User Experience Group is one of the largest volunteer led user experience professional organizations in south central Florida.'
    },{
      name: 'Design St. Pete',
      link: 'https://www.meetup.com/Design-St-Pete/',
      img: '/design-st-pete.png',
      description: 'This group is for anyone who is interested in the craft of design. Product managers, designers, developers, marketers, business analysts, and c-level executives are welcome.'
    },{
      name: 'AIGA Tampa Bay',
      link: 'https://tampabay.aiga.org/',
      img: '/aiga.png',
      description: 'As the largest community of design advocates, we bring together practitioners, enthusiasts, and patrons to amplify the voice of design and create the vision for a collective future'
    },{
      name: 'Dribbble Tampa',
      link: 'https://dribbble.com/places/tampa',
      img: '/dribbble-tampa.png',
      description: 'The official Dribbble community in Tampa: connect with other designers, swap art, win swag, and take part in an analog design challenge'
    },{
      name: 'Sketch Tampa',
      link: 'https://www.sketch.com/community/groups/tampa-bay/',
      img: '/sketch-tampa.png',
      description: 'This an official Sketch meetup for designers and developers in Tampa Bay. Join us to share knowledge, trade tips, and hear about new plugins and resources.'
    },{
      name: 'Figma Tampa',
      link: 'https://www.meetup.com/Figma-Tampa-Bay/',
      img: '/figma-tampa.png',
      description: 'This meetup is for all Figma users in the Tampa Bay Area! Learn, share and connect with your fellow Figmanites!'
    },
  ]

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

  const truncate = str => {
    return str.length > 74 ? str.substring(0, 74) + "..." : str;
  }

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
                className="top-8 transform opacity-0 scale-50 inline-block"
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.12*i }}
                key={link.name}
              >
                <ChipLink type={link.color} marginLeft marginRight>
                  <Link href={link.href}>
                    <a>{link.name}</a>
                  </Link>
                </ChipLink>
              </motion.div>
            ))
          }
        </div>
        <hr/>
        <h4 className="text-xl font-bold mt-4 mb-4" id="events">Our local design communities:</h4>
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
