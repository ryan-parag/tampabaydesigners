import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import { Check, Circle, CheckCircle } from 'react-feather'
import EmptyState from '@components/EmptyState'
import Alert from '@components/Alert'

const JobForm = () => {

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
    remote: false
  })

  const handleClose = () => {
    setError(false)
    setSent(false)
    setFormItems({
      company: '',
      role: '',
      link: '',
      location: '',
      remote: false
    });
    setFormOpen(false)
  }

  const changeRemote = () => {
    setFormItems({
      ...formItems,
      remote: !formItems.remote
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormItems({
      ...formItems,
      [name]: value
    });
    if(formItems.company.length > 0 && formItems.role.length > 0 && formItems.link.length > 0) {
      setError(false)
    }
  }

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    if(formItems.company.length > 0 && formItems.role.length > 0 && formItems.link.length > 0) {
      setError(false)
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      base('jobs').create([
        {
          "fields": {
            "Company": formItems.company,
            "Link": formItems.link,
            "Role": formItems.role,
            "Location": formItems.location,
            "Verified": false,
            "Submitted": date,
            "Open": true,
            "Remote": formItems.remote
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
              Let us help you find a designer
              </small>
            </p>
            <button
              className="button button--secondary"
              onClick={() => setFormOpen(!formOpen)}
            >
              Are you hiring?
            </button>
          </div>
        )
        :
        (
          <div className="block rounded-md mb-8 mt-8 p-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <div className="pb-4 flex flex-col items-center border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 mb-8">
              <Subtitle>💼 Add an open job!</Subtitle>
              <p className="text--secondary text-sm text-center">Submit an open role and we'll help match a designer for you:</p>
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
                  <p className="text-sm mb-4">Thanks! Your open role will be quickly verified and added to the list</p>
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
                  <label htmlFor="company" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="text-field"
                    type="text"
                    placeholder={'Which company is hiring?'}
                    value={formItems.company}
                    onChange={handleChange}
                  />
                  <label htmlFor="role" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Role
                  </label>
                  <input
                    id="role"
                    name="role"
                    className="text-field"
                    type="text"
                    placeholder={'What is the name of this role?'}
                    value={formItems.role}
                    onChange={handleChange}
                  />
                  <label htmlFor="link" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Job Posting
                  </label>
                  <input
                    id="link"
                    name="link"
                    className="text-field"
                    type="text"
                    placeholder={'https://linkedin.com'}
                    value={formItems.link}
                    onChange={handleChange}
                  />
                  <label htmlFor="location" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    className="text-field"
                    type="text"
                    placeholder={'City, State'}
                    value={formItems.location}
                    onChange={handleChange}
                  />
                  <label className="text--secondary block font-semibold text-sm mb-2">
                    Remote Work:
                  </label>
                  <label
                    htmlFor="open"
                    className={`transition p-3 bg-black dark:bg-white ${formItems.remote ? 'bg-opacity-80 text-white dark:text-black' : 'bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20'} rounded-md cursor-pointer flex items-center`}
                  >
                    <input
                      type="checkbox"
                      id="open"
                      onChange={changeRemote}
                      className="h-0 w-0"
                      checked={formItems.remote}
                    />
                    {
                      formItems.remote ? (
                        <CheckCircle className="text-green-500" size={'24'}/>
                      )
                      :
                      (
                        <Circle size={'24'}/>
                      )
                    }
                    <div className="pl-4 flex-1">
                      <div className="text-sm">Full or Partial Remote</div>
                    </div>
                  </label>
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

export default JobForm