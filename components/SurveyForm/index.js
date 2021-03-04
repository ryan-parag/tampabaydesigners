import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import { Check, Circle, CheckCircle, Edit2 } from 'react-feather'
import EmptyState from '@components/EmptyState'
import Alert from '@components/Alert'

const SurveyForm = () => {

  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formItems, setFormItems] = useState({
    name: '',
    email: '',
    portfolio: ''
  })

  const handleClose = () => {
    setError(false)
    setSent(false)
    setFormItems({
      name: '',
      email: '',
      portfolio: ''
    });
    setFormOpen(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormItems({
      ...formItems,
      [name]: value
    });
    if(formItems.name.length > 0 && formItems.email.length > 0 && formItems.portfolio.length > 0) {
      setError(false)
    }
  }

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    if(formItems.name.length > 0 && formItems.email.length > 0 && formItems.portfolio.length > 0) {
      setError(false)
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      base('portfolio-reviews').create([
        {
          "fields": {
            "Name": formItems.name,
            "Email": formItems.email,
            "Portfolio": formItems.portfolio
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
          <div className="block text-center mb-8 mt-8 px-4 py-8 rounded-md bg-green-100 dark:bg-green-500 dark:bg-opacity-20">
            <Edit2 size={'32'} className="inline-block mb-4 text-green-500"/>
            <p className="text-green-700 dark:text-green-300 mb-2">
              <small>
              Are you looking to receive feedback on your portfolio or chat with other local designers about their portfolios? Fill out the form!
              </small>
            </p>
            <button
              className="button button--secondary"
              onClick={() => setFormOpen(!formOpen)}
            >
              Interested in Portfolio Reviews?
            </button>
          </div>
        )
        :
        (
          <div className="block rounded-md mb-8 mt-8 p-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <div className="pb-4 flex flex-col items-center border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 mb-8">
              <Subtitle>Sign up to be notified about portfolio reviews</Subtitle>
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
                  <p className="text-sm mb-4">Thanks! We'll let you know when the next one is scheduled</p>
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
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="text-field"
                    type="text"
                    placeholder={'Ryan Parag'}
                    value={formItems.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="role" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="text-field"
                    type="email"
                    placeholder={'parag.ryan@gmail.com'}
                    value={formItems.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="link" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    Portfolio
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    className="text-field"
                    type="url"
                    placeholder={'https://ryanparag.com'}
                    value={formItems.portfolio}
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

export default SurveyForm