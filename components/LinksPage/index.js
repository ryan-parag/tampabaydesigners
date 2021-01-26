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

  const getDescription = (type) => {
    switch (type) {
      case 'designers':
        return 'Take a look at the portfolios/work of designers in the Tampa Bay area:'
        break;
      case 'resources':
        return 'These design resources include books, blogs, podcasts, videos, newsletters, and more! Check them out, and let us know what we\'ve missed:'
        break;
      default:
        return null
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
      <motion.p
        className="text-sm mb-4 text--secondary top-8 opacity-0"
        animate={{ top: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {getDescription(type)}
      </motion.p>
      {
        items.map((item, i) => (
          <motion.div
            className="top-8 relative opacity-0 mb-4"
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.02*i }}
            key={i}
          >
            <BoxOutbound flex href={item.fields.Link}>
              <div className="flex">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${getColor(type)}`}>
                  {getIcon(type)}
                </div>
              </div>
              <div className="block flex-1 pl-4">
                <h4 className="font-bold text-sm mb-1">{item.fields.Name}</h4>
                <span className="text--secondary text-xs">{item.fields.Description}</span>
              </div>
            </BoxOutbound>
          </motion.div>
        ))
      }
      <div className="p-4 text-center hidden">
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
      <>
        <motion.p
          className="text-sm mb-4 text--secondary top-8 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {getDescription(type)}
        </motion.p>
        <motion.div
          className="top-8 opacity-0"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <EmptyState type={'default'}>
            No{' '}{type}
          </EmptyState>
        </motion.div>
      </>
    )
  }
}


const LinksPage = ({ title, description, list, ...props }) => {

  const [listedItems, setListedItems] = useState(list)
  const [loading, setLoading] = useState(false)
  const [itemLength, setItemLength] = useState(10)
  const updateAmount = 10

  const categories = [
    {
      name: "Designers",
      route: "designers",
      icon: <User size={'16'} className="mr-2"/>,
      description: 'This is sup'
    },
    {
      name: "Resources",
      route: "resources",
      icon: <Link size={'16'} className="mr-2"/>,
      description: 'This is fool'
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

  useEffect(() => {

    console.log(list)

  }, [props.category, list])


  return (
    <>
      <Layout pageTitle={`${title} | Links`} description={description}>
        <Title
          title={'Links'}
          subtitle={'Find designers in the area or checkout one of the curated resources from the list below!'}
        />
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
              items={list}
              type={props.category}
              updateList={() => setItemLength(itemLength + updateAmount)}
            />
          )
        }
        <LinkForm categories={categories}/>
      </Layout>
    </>
  )
}

export default LinksPage