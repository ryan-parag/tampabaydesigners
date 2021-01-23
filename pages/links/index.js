import React, { useEffect } from 'react'
import LinksPage from '../links/LinksPage'
import { useRouter } from 'next/router'
import Loading from '@components/Loading'


const Links = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/links/designers')
  },[])

  return (
    <>
      <Loading>
        Loading
      </Loading>
    </>
  )
}

export default Links

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
