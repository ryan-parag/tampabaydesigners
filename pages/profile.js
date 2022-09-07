import React from 'react'
import Layout from '@components/Layout'
import { useUser } from '@auth0/nextjs-auth0';
import Box from '@components/Box';
import { Error, Loading } from '@components/DataStates'
import Avatar from '@components/Avatar';

const ProfilePage = ({ title, description, ...props }) => {

  const { user, error, isLoading } = useUser();
  console.log(user)

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
        className="pt-24 pb-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <h1>Account Settings</h1>
          { isLoading && <Loading/> }
          { error && <Error/> }
          {
            user ? (
              <>
                <Box p={'0'}>
                  <div className="px-3 py-3 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 flex items-center justify-between">
                    <h6>Your profile</h6>
                    <a className="button button--primary my-0" href="/api/auth/logout">Sign Out</a>
                  </div>
                  <div className="flex px-3 py-3">
                    <Avatar name={user.name} img={user.picture}/>
                    <div className="w-full flex-1 pl-4">
                      <span className="text-sm">Name</span>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </Box>
              </>
            )
            :
            (
              <Box>
                <div className="text-center flex flex-col items-center">
                  <a className="button button--primary" href="/api/auth/login">Sign In</a>
                </div>
              </Box>
            )
          }
        </div>
      </section>
    </Layout>
  )
}

export default ProfilePage

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}