import React, { useState, useEffect } from 'react'
import Divider from '@components/Divider'
import Airtable from 'airtable'
import { Subtitle } from '@components/Title'
import { motion } from 'framer-motion'
import SurveyForm from '@components/SurveyForm'

const Recent = () => {

  const [recent, setRecent] = useState([])
  const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

  base('recent').select({
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      const items = []
      records.forEach(function(record) {
          let newItem = {
            name: record.get('Name'),
            type: record.get('Type'),
            link: record.get('Link'),
            linkText: record.get('Link Text')
          }
          items.push(newItem)
      });
      fetchNextPage();
      setRecent(items)
  }, function done(err) {
      if (err) { console.error(err); return; }
  });

  const getType = (type) => {
    switch (type) {
      case 'danger':
        return '🚨'
        break;
      case 'success':
        return '🙌'
        break;
      case 'info':
        return '🎉'
        break;
      case 'warning':
        return '💼'
        break;
      default:
        return '⏰'
    }
  }

  useEffect(() => {

  }, [])

  if(recent.length > 0) {
    return(
      <div>
        <motion.div
          className="pb-4 opacity-0 top-8"
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SurveyForm/>
          <Subtitle>Recent Updates</Subtitle>
          {
            recent.map((item, i) => (
              <div
                key={i}
                className="text-sm mb-2"
              >
                <span className="mr-2">{getType(item.type.toLowerCase())}</span>
                <span className="mr-2 text--secondary">{item.name}</span>
                <span className="mr-2">
                  <a className="underline font-semibold transition" href={item.link}>{item.linkText}</a>
                </span>
              </div>
            ))
          }
        </motion.div>
        <Divider/>
      </div>
    )
  } else {
    return null
  }
}

export default Recent