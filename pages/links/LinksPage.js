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
import LinkForm from '@components/LinkForm'

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
            transition={{ duration: 0.5, delay: 0.02*i }}
            key={i}
          >
            <BoxOutbound flex href={item.href}>
              <div className="flex">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${getColor(type)}`}>
                  {getIcon(type)}
                </div>
              </div>
              <div className="block flex-1 pl-4">
                <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                <span className="text--secondary text-xs">{item.role}</span>
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
      <EmptyState type={'default'}>
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

    getData()

  }, [props.category, itemLength])


  return (
    <>
      <Layout pageTitle={`Tampa Bay Designers | Links`} description={description}>
        <Title
          title={'Links'}
          subtitle={'Find designers in the area or checkout one of the curated resources from the list below!'}
        />
        <LinkForm categories={categories}/>
        <motion.div
          className={`w-full mb-4 grid grid-cols-2 gap-2 p-2 rounded-md bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 top-4 opacity-0`}
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
