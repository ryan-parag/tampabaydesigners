import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import Title, { Subtitle } from '@components/Title'
import SlackGroup from '@components/SlackGroup'

const Slack = ({ title, description, ...props }) => {

  const slackGroups = [
    {
      name: 'Tampa Bay Designers',
      description: 'Tampa Bay Designers is a collective of UX designers, illustrators, web designers, and more with the goal of sharing knowledge, feedback, and job opportunities.',
      link: siteConfig.slackSignUp,
      img: '/favicon/tbd.svg',
    }, {
      name: 'Tampa Bay UX',
      description: 'The Tampa Bay User Experience Group is one of the largest volunteer led user experience professional organizations in south central Florida.',
      link: 'https://join.slack.com/t/tampabayux/shared_invite/zt-fn2ie4h2-89xqc9~oDdLNoQq3Ah7rnA',
      img: '/tampa-bay-ux.png',
    }, {
      name: 'Design St. Pete',
      description: 'This group is for anyone who is interested in the craft of design. Product managers, designers, developers, marketers, business analysts, and c-level executives are welcome.',
      link: 'https://join.slack.com/t/designstpete/shared_invite/zt-8gv4mxo4-MVynPysniGgZT5G3DlMEcg',
      img: '/design-st-pete.png',
    }
  ]

  const truncate = str => {
    return str.length > 74 ? str.substring(0, 74) + "..." : str;
  }

  return (
    <>
      <Layout pageTitle={`${title} | Slack`} description={description}>
        <Title
          title={'Slack Communities'}
          subtitle={'Discuss trends, give advice, share feedback, look for new opportunities, and more inside one of the local Slack communities.'}
        />
        <Subtitle>Find a community from the list below:</Subtitle>
       <div>
         {
           slackGroups.map((group, i) => (
             <SlackGroup
              delay={i}
              name={group.name}
              img={group.img}
              description={group.description}
              link={group.link}
             />
           ))
         }
       </div>
        <div className="block text-center mb-8">
          <p className="text-custom-orange dark:text-custom-yellow mb-2">
            <small>
              Want to customize your Slack theme?
            </small>
          </p>
          <a className="button button--secondary" target="_blank" href="https://slack-themes.now.sh/">Find one on Slack Themes!</a>
        </div>
      </Layout>
    </>
  )
}

export default Slack

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}
