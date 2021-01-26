import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import { Check, Circle, CheckCircle } from 'react-feather'
import EmptyState from '@components/EmptyState'
import Alert from '@components/Alert'

const EventForm = () => {

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formItems, setFormItems] = useState({
    org: 'Other',
    name: '',
    description: '',
    link: '',
    date: null
  })

  const orgs = ["Tampa Bay UX", "Figma Tampa", "Dribbble Tampa", "Sketch Tampa", "Design St. Pete", "Other"]

  const handleClose = () => {
    setError(false)
    setSent(false)
    setFormItems({
      org: 'Other',
      name: '',
      description: '',
      link: '',
      date: null
    });
    setFormOpen(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormItems({
      ...formItems,
      [name]: value
    });
    if(formItems.name.length > 0 && formItems.description.length > 0 && formItems.link.length > 0) {
      setError(false)
    }
  }

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    if(formItems.name.length > 0 && formItems.description.length > 0 && formItems.link.length > 0) {
      setError(false)
      base('events').create([
        {
          "fields": {
            "Name": formItems.name,
            "Link": formItems.link,
            "Description": formItems.description,
            "Verified": false,
            "Date": formItems.date,
            "Org": formItems.org
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        setSent(true)
      });
    } else {
      setError(true)
    }
  }

  useEffect(() => {

  }, [formItems || error])

  return(
    <motion.div
      className="opacity-0"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {
        !formOpen ? (
          <div className="block text-center mb-8 mt-8">
            <p className="text-custom-orange dark:text-custom-yellow mb-2">
              <small>
              Don't see an event listed or want to submit one?
              </small>
            </p>
            <button
              className="button button--secondary"
              onClick={() => setFormOpen(!formOpen)}
            >
              Submit an event to be listed
            </button>
          </div>
        )
        :
        (
          <div className="block rounded-md mb-8 mt-8 p-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <div className="pb-4 flex flex-col items-center border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 mb-8">
              <Subtitle>📆 Add an Event!</Subtitle>
              <p className="text--secondary text-sm text-center">Submit an upcoming event by entering the details in the info below:</p>
            </div>
            {
              error ? (
                <Alert
                  type='danger'
                >
                  🤯 It seems like something is wrong with one or more of the fields below
                </Alert>
              )
              :
              null
            }
            {
              sent ? (
                <>
                <EmptyState type="success">
                  <p className="text-sm mb-4">Thanks! Your event will be quickly verified and added to the list</p>
                  <button
                    className="button button--primary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </EmptyState>
                </>
              )
              :
              (
                <motion.div
                  className="h-0 overflow-hidden opacity-0"
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0 }}
                >
                  <div className="mb-4">
                    <label htmlFor="name" className="text--secondary font-semibold text-sm mb-2 inline-block">
                      Hosted by:
                    </label>
                    <div className="flex flex-wrap">
                      {
                        orgs.map((item, i) => (
                          <label
                            className={`transition mb-2 p-3 bg-black dark:bg-white ${formItems.org === item ? 'bg-opacity-80 text-white dark:text-black' : 'bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20'} rounded-md cursor-pointer inline-flex items-center mr-2`}
                            key={i}
                          >
                            <input
                              type="radio"
                              name="org"
                              value={item}
                              checked={formItems.type === item}
                              onChange={handleChange}
                              className="h-0 w-0"
                            />
                            {
                              formItems.org === item ? (
                                <CheckCircle className="text-green-500" size={'24'}/>
                              )
                              :
                              (
                                <Circle size={'24'}/>
                              )
                            }
                            <span className="ml-2 text-sm">{item}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                  <label htmlFor="name" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Event Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="text-field"
                    type="text"
                    placeholder={''}
                    value={formItems.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="description" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Event Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    className="text-field"
                    type="text"
                    placeholder={''}
                    value={formItems.description}
                    onChange={handleChange}
                  />
                  <label htmlFor="date" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Event Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    className="text-field"
                    type="date"
                    placeholder={''}
                    value={formItems.date}
                    onChange={handleChange}
                  />
                  <label htmlFor="link" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Event URL
                  </label>
                  <input
                    id="link"
                    name="link"
                    className="text-field"
                    type="text"
                    placeholder={'Where can people register for the event?'}
                    value={formItems.link}
                    onChange={handleChange}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button
                      className="button button--secondary flex w-full"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="button button--primary flex w-full"
                      onClick={sendItem}
                    >
                      Send
                    </button>
                  </div>
                </motion.div>
              )
            }
          </div>
        )
      }
    </motion.div>
  )
}

export default EventForm