import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import EmptyState from '@components/EmptyState'
import Alert from '@components/Alert'
import { Mail } from 'react-feather'

const Form = ({cancelForm}) => {

  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formItems, setFormItems] = useState({
    name: '',
    email: '',
    portfolio: ''
  })

  const handleClose = () => {
    cancelForm ? cancelForm() : null
    setError(false)
    setSent(false)
    setFormItems({
      name: '',
      email: '',
      portfolio: ''
    });
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
      <div className="block rounded-md mb-8 mt-8 p-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <div className="pb-4 flex flex-col items-center text-center border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 mb-8">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 bg-opacity-20 text-yellow-500`}>
                <Mail size={'24'}/>
              </div>
              <Subtitle>Sign up to be notified about portfolio reviews</Subtitle>
              <p className="text--secondary text-sm">Want feedback on your portfolio or personal site? Sign up to be notified when we gather next! Ask for critique, no matter what phase you're in as you're creating your portfolio!</p>
            </div>
            {
              error ? (
                <Alert
                  type='danger'
                  role="alert"
                >
                  🤯 It seems like something is wrong with one or more of the fields below
                </Alert>
              )
              :
              null
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <strong>Topics covered:</strong>
                <ul className="mt-2">
                  <li className="text-green-700 dark:text-green-300 text-sm mb-2">
                    + What employers look for when hiring a designer
                  </li>
                  <li className="text-green-700 dark:text-green-300 text-sm mb-2">
                    + What you should include in your portfolio
                  </li>
                  <li className="text-green-700 dark:text-green-300 text-sm mb-2">
                    + Get feedback to improve your portfolio
                  </li>
                  <li className="text-green-700 dark:text-green-300 text-sm mb-2">
                    + How to make your portfolio stand out
                  </li>
                  <li className="text-green-700 dark:text-green-300 text-sm mb-2">
                    + Get inspiration from other portfolio examples
                  </li>
                </ul>
              </div>
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
                    <div className={`grid ${cancelForm ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mt-8`}>
                      {
                        cancelForm ? (
                          <button
                            className="button button--secondary flex w-full"
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                        )
                        :
                        null
                      }
                      <button
                        className="button button--primary flex w-full"
                        onClick={sendItem}
                      >
                        Sign Up
                      </button>
                    </div>
                  </motion.div>
                )
              }
            </div>
          </div>
    </motion.div>
  )
}

export default Form