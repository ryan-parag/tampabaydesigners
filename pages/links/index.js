import React, { useEffect } from 'react'
import LinksPage from '../links/LinksPage'
import { useRouter } from 'next/router'
import EmptyState from '@components/EmptyState'


const Links = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/links/designers')
  },[])

  return (
    <>
      <EmptyState>
        Loading
      </EmptyState>
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
