import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '@components/Loading'

const Links = ({title, description, ...props}) => {

  const router = useRouter()

  useEffect(() => {
    router.push('/links/designers')
  },[])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loading>
        Loading
      </Loading>
    </div>
  )
}

export default Links

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}
