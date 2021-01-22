import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import Title, { Subtitle } from '@components/Title'
import SlackGroup from '@components/SlackGroup'
import slack from '@data/slack'

const Slack = ({ title, description, ...props }) => {

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
           slack.map((group, i) => (
             <SlackGroup
              delay={i}
              name={group.name}
              img={group.img}
              description={group.description}
              link={group.link}
              key={group.name}
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
