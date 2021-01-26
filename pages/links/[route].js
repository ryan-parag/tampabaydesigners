import { useRouter } from "next/router";
import LinksPage from '@components/LinksPage'
import AirtablePlus from 'airtable-plus'

const Route = ({title, description, list}) => {
  const router = useRouter();
  const { route } = router.query;
  return (
    <>
      <LinksPage
        category={route}
        title={title}
        description={description}
        list={list}
      />
    </>
  );
};

export async function getStaticPaths() {
  const categories = ['designers', 'resources']
  const paths = categories.map((route) => ({
    params: { route },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params: {route} }) {
  const configData = await import(`../../siteconfig.json`)

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: route,
  });

  const data = await airtable.read({
    filterByFormula: 'Verified'
  });

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
      list: data
    },
  }
}


export default Route;