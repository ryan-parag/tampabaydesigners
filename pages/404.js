import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '@components/Loading'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  },[])

  return(
    <div className="h-screen w-full flex items-center justify-center">
      <Loading>
        Redirecting
      </Loading>
    </div>
  )
}

export default NotFound