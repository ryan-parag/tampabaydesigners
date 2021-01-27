import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import { Check, Circle, CheckCircle } from 'react-feather'
import EmptyState from '@components/EmptyState'
import Alert from '@components/Alert'

const LinkForm = ({categories}) => {

  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formItems, setFormItems] = useState({
    type: 'designers',
    name: '',
    role: '',
    link: '',
    open: true
  })

  const handleClose = () => {
    setError(false)
    setSent(false)
    setFormItems({
      type: 'designers',
      name: '',
      role: '',
      link: '',
      open: true
    });
    setFormOpen(false)
  }

  const changeOpen = () => {
    setFormItems({
      ...formItems,
      open: !formItems.open
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormItems({
      ...formItems,
      [name]: value
    });
    if(formItems.name.length > 0 && formItems.role.length > 0 && formItems.link.length > 0) {
      setError(false)
    }
  }

  const createObj = () => {

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    if(formItems.type === 'designers') {
      const obj = {
        "fields": {
          "Name": formItems.name,
          "Link": formItems.link,
          "Description": formItems.role,
          "Verified": false,
          "Updated": date,
          "Open": formItems.open
        }
      }
      return obj
    } else {
      const obj = {
        "fields": {
          "Name": formItems.name,
          "Link": formItems.link,
          "Description": formItems.role,
          "Verified": false,
          "Updated": date
        }
      }
      return obj
    }
  }

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    if(formItems.name.length > 0 && formItems.role.length > 0 && formItems.link.length > 0) {
      setError(false)
      base(formItems.type).create([createObj()], function(err, records) {
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
                Have a designer or link to add to the list?
              </small>
            </p>
            <button
              className="button button--secondary"
              onClick={() => setFormOpen(!formOpen)}
            >
              Add something or someone!
            </button>
          </div>
        )
        :
        (
          <div className="block rounded-md mb-8 mt-8 p-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <div className="pb-4 flex flex-col items-center border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 mb-8">
              <Subtitle>🎉 {formItems.type === 'designers' ? 'Submit your portfolio' : 'Add something to the list'}!</Subtitle>
              <p className="text--secondary text-sm text-center">
                {
                  formItems.type === 'designers' ? (
                    'Submit your information to be added to a portfolio database that will be shared with companies who are hiring designers. Add your info below:'
                  )
                  : (
                    'Do you know of any design resources that could be helpful? Add a new resource below:'
                  )
                }
              </p>
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
                  <p className="text-sm mb-4">Thanks! Your submission will be quickly verified and added to the list</p>
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
                      Submit an item to:
                    </label>
                    <div className="flex">
                      {
                        categories.map((item, i) => (
                          <label
                            className={`transition p-3 bg-black dark:bg-white ${formItems.type === item.route ? 'bg-opacity-80 text-white dark:text-black' : 'bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20'} rounded-md cursor-pointer inline-flex items-center mr-2`}
                            key={i}
                          >
                            <input
                              type="radio"
                              name="type"
                              value={item.route}
                              checked={formItems.type === item.route}
                              onChange={handleChange}
                              className="h-0 w-0"
                            />
                            {
                              formItems.type === item.route ? (
                                <CheckCircle className="text-green-500" size={'24'}/>
                              )
                              :
                              (
                                <Circle size={'24'}/>
                              )
                            }
                            <span className="ml-2">{item.name}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                  <label htmlFor="name" className="text--secondary font-semibold text-sm mb-2 inline-block">
                    {formItems.type === 'designers' ? 'Name' : 'Resource Name'}
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="text-field"
                    type="text"
                    placeholder={formItems.type === 'designers' ? 'Ryan Parag' : 'Tampa Bay Designers'}
                    value={formItems.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="link" className="text--secondary font-semibold text-sm mb-2 inline-block">
                  {formItems.type === 'designers' ? 'Portfolio' : 'Link'}
                  </label>
                  <input
                    id="link"
                    name="link"
                    className="text-field"
                    type="url"
                    placeholder="https://tampabay.design"
                    value={formItems.link}
                    onChange={handleChange}
                  />
                  <label htmlFor="role" className="text--secondary font-semibold text-sm mb-2 inline-block">Description/Comment</label>
                  <input
                    id="role"
                    name="role"
                    className="text-field"
                    type="text"
                    placeholder={formItems.type === 'designers' ? 'Product Designer' : 'Discover design communities in the Tampa Bay area!'}
                    value={formItems.role}
                    onChange={handleChange}
                  />
                  {
                    formItems.type === 'designers' ? (
                      <>
                        <label className="text--secondary block font-semibold text-sm mb-2">
                          Job search:
                        </label>
                        <label
                          htmlFor="open"
                          className={`transition p-3 bg-black dark:bg-white ${formItems.open ? 'bg-opacity-80 text-white dark:text-black' : 'bg-opacity-5 dark:bg-opacity-10 hover:bg-opacity-10 dark:hover:bg-opacity-20'} rounded-md cursor-pointer flex items-center`}
                        >
                          <input
                            type="checkbox"
                            id="open"
                            onChange={changeOpen}
                            className="h-0 w-0"
                            checked={formItems.open}
                          />
                          {
                            formItems.open ? (
                              <CheckCircle className="text-green-500" size={'24'}/>
                            )
                            :
                            (
                              <Circle size={'24'}/>
                            )
                          }
                          <div className="pl-4 flex-1">
                            <div className="text-sm">Open to Offers</div>
                            <div className="text-xs mt-1">You're open to hear about new opportunities or are actively looking</div>
                          </div>
                        </label>
                      </>
                    )
                    :
                    null
                  }
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

export default LinkForm