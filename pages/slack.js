import Layout from '@components/Layout'
import Link from 'next/link'
import siteConfig from '../siteconfig.json'

const Slack = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Slack`} description={description}>
        <h1>Slack</h1>
        <a href={siteConfig.slackSignUp}>
          Sign Up
        </a>
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
