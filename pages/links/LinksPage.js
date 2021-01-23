import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout'
import { motion } from 'framer-motion'
import Title, { Subtitle } from '@components/Title'
import EmptyState from '@components/EmptyState'
import { useRouter } from 'next/router'
import Airtable from 'airtable'
import { BoxOutbound } from '@components/Box'
import NavItem from '@components/NavItem'
import Loading from '@components/Loading'
import { User, Link } from 'react-feather'

const ItemList = ({ items, type, updateList }) => {

  const getColor = (type) => {
    switch (type) {
      case 'designers':
        return 'bg-green-500 bg-opacity-20 text-green-500'
        break;
      case 'resources':
        return 'bg-yellow-500 bg-opacity-20 text-yellow-500'
        break;
      default:
        return 'bg-black bg-opacity-10 dark:bg-white'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'designers':
        return <User size={'20'}/>
        break;
      case 'resources':
        return <Link size={'20'}/>
        break;
      default:
        return <Link size={'20'}/>
    }
  }

  if(items.length > 0) {
    return(
      <>
      {
        items.map((item, i) => (
          <motion.div
            className="top-8 relative opacity-0 mb-4"
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12*i }}
            key={i}
          >
            <BoxOutbound flex href={item.href}>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${getColor(type)}`}>
                {getIcon(type)}
              </div>
              <div className="pl-4">
                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                <span className="text--secondary text-xs">{item.role} | {item.href}</span>
              </div>
            </BoxOutbound>
          </motion.div>
        ))
      }
      <div className="p-4 text-center">
        <button
          className="button button--secondary"
          onClick={updateList}
        >
          Load more...
        </button>
      </div>
      </>
    )
  } else {
    return(
      <EmptyState>
        No{' '}{type}
      </EmptyState>
    )
  }
}


const LinksPage = ({ title, description, ...props }) => {

  const [listedItems, setListedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [itemLength, setItemLength] = useState(10)
  const updateAmount = 10

  const categories = [
    {
      name: "Designers",
      route: "designers",
      icon: <User size={'16'} className="mr-2"/>
    },
    {
      name: "Resources",
      route: "resources",
      icon: <Link size={'16'} className="mr-2"/>
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
    setLoading(true)
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    base(props.category).select({
      view: 'Grid view',
      maxRecords: itemLength
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        let verified = record.get('Verified')
        if(verified) {
          let designer = {
            name: record.get('Name'),
            role: record.get('Description'),
            href: record.get('Link'),
            date: record.get('Updated'),
          }
          designers.push(designer)
        }
      })
      setListedItems(designers)
    }, function done(err) {
      if( err) { console.log(err); return; }
    })
    setLoading(false)
  }

  useEffect(() => {
    let unmounted = false

    getData()

   return () => { unmounted = true }
  }, [listedItems])


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
              {item.icon}
              {item.name}
            </NavItem>
          ))}
        </motion.div>
        {
          loading ? (
            <Loading>Loading</Loading>
          )
          :
          (
            <ItemList
              items={listedItems}
              type={props.category}
              updateList={() => setItemLength(itemLength + updateAmount)}
            />
          )
        }
        <motion.section
          className="relative top-4 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="block text-center mb-8 mt-8">
            <p className="text-custom-orange dark:text-custom-yellow mb-2">
              <small>
                Have a designer or link to add to the list?
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
