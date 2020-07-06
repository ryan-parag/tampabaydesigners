import Layout from '@components/Layout'
import Placeholder from '@components/Placeholder'

const Meetups = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Meetups`} description={description}>
        <h1>Meetups</h1>
        <Placeholder/>
      </Layout>
    </>
  )
}

export default Meetups

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
