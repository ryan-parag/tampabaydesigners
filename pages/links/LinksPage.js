import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import EmptyState from '@components/EmptyState'
import { useRouter } from 'next/router'
import Airtable from 'airtable'
import { BoxOutbound } from '@components/Box'
import NavItem from '@components/NavItem'


const LinksPage = ({ title, description, ...props }) => {

  const categories = [
    {
      name: "Designers",
      route: "designers",
    },
    {
      name: "Resources",
      route: "resources",
    }
  ];

  const router = useRouter()
  const { route } = router.query

  const activeNavItem = (href) => {
    if(route === href) {
      return 'active'
    } else {
      return 'default'
    }
  }



  const designers=[]

  const getData = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    /*base('designers').select({
      view: 'Grid view'
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let verified = record.get('Verified')
        if(verified) {
          let designer = {
            name:  record.get('Name'),
            role:  record.get('Role'),
            href: record.get('Link'),
          }
          designers.push(designer)
        }
      })
    }, function done(err) {
      if( err) { console.log(err); return; }
    })
    //console.log(designers)*/
  }

  useEffect(() => {
    let unmounted = false

    getData()
    let arr = [{name:'Ryan', stuff: 'stuff'}]
    //console.log(arr)

   return () => { unmounted = true }
  }, [designers])


  return (
    <>
      <Layout pageTitle={`${title} | Links`} description={description}>
        <Title
          title={'Links'}
          subtitle={'Find designers in the area or checkout one of the curated resources from the list below!'}
        />
        <motion.div
          className={`w-full mb-4 grid grid-cols-${categories.length} gap-2 p-2 rounded-md bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 top-4 opacity-0`}
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {categories.map((item, index) => (
            <NavItem
              as={`/links/${item.route}`}
              href="/links/[route]"
              key={index}
              state={activeNavItem(item.route)}
              center
            >
              {item.name}
            </NavItem>
          ))}
        </motion.div>
        {
          designers.map(designer => (
            <BoxOutbound href={designer.href}>
              <h4>{designer.name}</h4>
              <span>{designer.role}</span>
            </BoxOutbound>
          ))
        }
        <motion.section
          className="relative top-4 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <EmptyState>
            Coming soon...
          </EmptyState>
          <div className="block text-center mb-8 mt-8">
            <p className="text-custom-orange dark:text-custom-yellow mb-2">
              <small>
                Do you want to add a designer to the list directory? Have a link to share?
              </small>
            </p>
            <a className="button button--secondary" href="mailto:tampabaydesigners@gmail.com">Share a Link!</a>
          </div>
        </motion.section>
      </Layout>
    </>
  )
}

export default LinksPage

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
