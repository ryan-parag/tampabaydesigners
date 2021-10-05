import React from 'react'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import ListItem from '@components/ListItem'
import { LatestHangout } from '@components/Hangouts'

const AbsoluteImages = () => {

  const images = [
    {
      type: 'triangle',
      classes: 'w-28 -z-3 rotate-45 filter blur-sm -top-12 left-48'
    }, {
      type: 'diamond',
      classes: 'w-32 md:w-48 -z-3 filter blur-sm top-1/3 -left-14 md:-left-20'
    }, {
      type: 'oval',
      classes: 'w-32 md:w-40 z-10 -top-16 md:-top-20 left-28'
    }, {
      type: 'pentagon',
      classes: 'w-32 md:w-40 z-10 -top-16 -right-16'
    }, {
      type: 'quarter',
      classes: 'rotate-12 w-24 -z-3 filter blur-sm -bottom-12 right-36'
    }
  ]
  return(
    <>
      {
        images.map((item, i) => (
          <motion.img
            key={i}
            src={`static/${item.type}.png`}
            className={`transform absolute opacity-0 select-none ${item.classes}`}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3*i }}
          />
        ))
      }
    </>
  )
}

const Index = ({ title, description, ...props }) => {

  return (
    <Layout pageTitle={title} description={description} ogImage={'/tbd-sm.png'}>
      <section
      className="relative pt-24 lg:pt-40 pb-24 flex items-start lg:items-center w-full overflow-x-hidden"
        style={{
          backgroundImage: "url('/static/blur-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container p-3 mx-auto lg:w-1/2">
          <div className="relative">
            <AbsoluteImages/>
            <motion.div
              className="transform card w-50 opacity-0 top-4"
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl xl:text-5xl mt-0">Discover design communities in the Tampa Bay area!</h1>
              <p>New to the Tampa Bay/St. Pete design community?</p>
              <p>This space is used to organize the information about all of the events and groups from each of the design organizations in the Tampa Bay/St. Pete area!</p>
              <p>Find a slack group, check out upcoming events, look for ways to get feedback, and much more using one of the links below.</p>
            </motion.div>
          </div>
          <div className="pt-16">
            <LatestHangout/>
          </div>
          <ul className="mt-24">
            <motion.li
              className={`relative opacity-0 top-4`}
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <ListItem title={'Join Slack Groups'} href={'/slack'}>
                <svg className="relative z-10" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="12" fill="currentColor" className="text-white dark:text-black" />
                  <path d="M15.3245 27.965C15.3245 29.7086 13.9164 31.1179 12.1742 31.1179C10.4319 31.1179 9.0238 29.7086 9.0238 27.965C9.0238 26.2214 10.4319 24.8121 12.1742 24.8121H15.3245V27.965ZM16.8997 27.965C16.8997 26.2214 18.3078 24.8121 20.05 24.8121C21.7923 24.8121 23.2004 26.2214 23.2004 27.965V35.8472C23.2004 37.5908 21.7923 39 20.05 39C18.3078 39 16.8997 37.5908 16.8997 35.8472V27.965Z" fill="currentColor" className="text-black dark:text-white"/>
                  <path d="M20.0501 15.3057C18.3079 15.3057 16.8997 13.8965 16.8997 12.1529C16.8997 10.4092 18.3079 9 20.0501 9C21.7923 9 23.2005 10.4092 23.2005 12.1529V15.3057H20.0501ZM20.0501 16.9061C21.7923 16.9061 23.2005 18.3153 23.2005 20.0589C23.2005 21.8025 21.7923 23.2118 20.0501 23.2118H12.1504C10.4081 23.2118 9 21.8025 9 20.0589C9 18.3153 10.4081 16.9061 12.1504 16.9061H20.0501Z" fill="currentColor" className="text-black dark:text-white"/>
                  <path d="M32.6754 20.0589C32.6754 18.3153 34.0836 16.9061 35.8258 16.9061C37.568 16.9061 38.9761 18.3153 38.9761 20.0589C38.9761 21.8025 37.568 23.2118 35.8258 23.2118H32.6754V20.0589ZM31.1003 20.0589C31.1003 21.8025 29.6922 23.2118 27.9499 23.2118C26.2077 23.2118 24.7996 21.8025 24.7996 20.0589V12.1529C24.7996 10.4092 26.2077 9 27.9499 9C29.6922 9 31.1003 10.4092 31.1003 12.1529V20.0589V20.0589Z" fill="currentColor" className="text-black dark:text-white"/>
                  <path d="M27.9499 32.6943C29.6922 32.6943 31.1003 34.1035 31.1003 35.8472C31.1003 37.5908 29.6922 39 27.9499 39C26.2077 39 24.7996 37.5908 24.7996 35.8472V32.6943H27.9499ZM27.9499 31.1179C26.2077 31.1179 24.7996 29.7086 24.7996 27.965C24.7996 26.2214 26.2077 24.8121 27.9499 24.8121H35.8497C37.5919 24.8121 39 26.2214 39 27.965C39 29.7086 37.5919 31.1179 35.8497 31.1179H27.9499Z" fill="currentColor" className="text-black dark:text-white"/>
                </svg>
              </ListItem>
            </motion.li>
            <motion.li
              className={`relative opacity-0 top-4`}
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <ListItem title={'Explore Communities'} href={'/groups'}>
                <svg className="relative z-10" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="12" fill="currentColor" className="text-white dark:text-black"/>
                  <path d="M24 9C15.705 9 9 15.75 9 24C9 27.9782 10.5804 31.7936 13.3934 34.6066C14.7863 35.9995 16.4399 37.1044 18.2597 37.8582C20.0796 38.612 22.0302 39 24 39C27.9782 39 31.7936 37.4196 34.6066 34.6066C37.4196 31.7936 39 27.9782 39 24C39 22.0302 38.612 20.0796 37.8582 18.2597C37.1044 16.4399 35.9995 14.7863 34.6066 13.3934C33.2137 12.0005 31.5601 10.8956 29.7403 10.1418C27.9204 9.38799 25.9698 9 24 9V9ZM29.4 18.51C31.005 18.51 32.295 19.8 32.295 21.405C32.295 23.01 31.005 24.3 29.4 24.3C28.6322 24.3 27.8958 23.995 27.3529 23.4521C26.81 22.9092 26.505 22.1728 26.505 21.405C26.49 19.8 27.795 18.51 29.4 18.51ZM20.4 16.14C22.35 16.14 23.94 17.73 23.94 19.68C23.94 21.63 22.35 23.25 20.4 23.25C18.45 23.25 16.86 21.63 16.86 19.68C16.86 17.715 18.435 16.14 20.4 16.14ZM20.4 29.835V35.46C16.8 34.335 13.95 31.56 12.69 28.02C14.25 26.34 18.195 25.5 20.4 25.5C21.195 25.5 22.2 25.605 23.25 25.815C20.79 27.12 20.4 28.845 20.4 29.835ZM24 36C23.58 36 23.19 36 22.8 35.94V29.835C22.8 27.705 27.21 26.64 29.4 26.64C31.005 26.64 33.75 27.225 35.16 28.365C33.405 32.82 29.07 36 24 36Z" fill="currentColor" className="text-black dark:text-white"/>
                </svg>
              </ListItem>
            </motion.li>
            <motion.li
              className={`relative opacity-0 top-4`}
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <ListItem title={'Find an Event'} href={'/events'}>
                <svg className="relative z-10" width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="12" fill="currentColor" className="text-white dark:text-black"/>
                  <path d="M35.875 31.375V19H16.625V31.375H35.875ZM35.875 12.125C36.6043 12.125 37.3038 12.4147 37.8195 12.9305C38.3353 13.4462 38.625 14.1457 38.625 14.875V31.375C38.625 32.1043 38.3353 32.8038 37.8195 33.3195C37.3038 33.8353 36.6043 34.125 35.875 34.125H16.625C15.0987 34.125 13.875 32.8875 13.875 31.375V14.875C13.875 14.1457 14.1647 13.4462 14.6805 12.9305C15.1962 12.4147 15.8957 12.125 16.625 12.125H18V9.375H20.75V12.125H31.75V9.375H34.5V12.125H35.875ZM31.1038 23.2075L24.9988 29.3125L21.3137 25.6275L22.7713 24.17L24.9988 26.3975L29.6462 21.75L31.1038 23.2075ZM11.125 36.875H30.375V39.625H11.125C9.59875 39.625 8.375 38.3875 8.375 36.875V20.375H11.125V36.875Z" fill="currentColor" className="text-black dark:text-white"/>
                </svg>
              </ListItem>
            </motion.li>
            <motion.li
              className={`relative opacity-0 top-4`}
              animate={{ top: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <ListItem title={'Designer Interviews'} href={'/interviews'} awaiting>
                <svg className="relative z-10" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="10" fill="currentColor" className="text-white dark:text-black"/>
                  <path d="M20 6.84204C11.959 6.84204 5.38 12.076 5.38 18.538C5.4531 21.6814 6.92972 24.6345 9.4005 26.579C9.4005 27.4562 8.78646 29.7516 5.38 33.158C8.84494 32.9972 12.1637 31.696 14.8392 29.503C16.5059 29.9854 18.2602 30.2341 20 30.2341C28.041 30.2341 34.62 25.0001 34.62 18.538C34.62 12.076 28.041 6.84204 20 6.84204ZM20 27.31C13.5379 27.31 8.304 23.3772 8.304 18.538C8.304 13.6988 13.5379 9.766 20 9.766C26.4621 9.766 31.6959 13.6988 31.6959 18.538C31.6959 23.3772 26.4621 27.31 20 27.31ZM27.3099 20V17.0761H24.386V20H27.3099ZM21.462 20V17.0761H18.538V20H21.462ZM15.614 20V17.0761H12.69V20H15.614Z" fill="currentColor" className="text-black dark:text-white"/>
                </svg>
              </ListItem>
            </motion.li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
