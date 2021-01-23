import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subtitle } from '@components/Title'
import Airtable from 'airtable'
import { Check } from 'react-feather'

const LinkForm = ({categories}) => {

  const [formOpen, setFormOpen] = useState(false)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const [formItems, setFormItems] = useState({
    type: 'designers',
    name: '',
    role: '',
    link: ''
  })

  const handleClose = () => {
    setError(false)
    setSent(false)
    setFormItems({
      type: 'designers',
      name: '',
      role: '',
      link: ''
    });
    setFormOpen(false)
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

  const sendItem = () => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE)

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    if(formItems.name.length > 0 && formItems.role.length > 0 && formItems.link.length > 0) {
      setError(false)
      base(formItems.type).create([
        {
          "fields": {
            "Name": formItems.name,
            "Link": formItems.link,
            "Description": formItems.role,
            "Verified": false,
            "Updated": date
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
              <Subtitle>🎉 Add something to the list!</Subtitle>
              <p className="text--secondary text-sm text-center">Are you a designer or or know someone who would make a great addition to the list? Do you know of any design resources that could be helpful? Add someone or something below:</p>
            </div>
            {
              error ? (
                <div className="rounded-md p-4 bg-red-500 bg-opacity-20 text-red-700 dark:text-red-300 text-sm mb-4">
                  🤯 It seems like something is wrong with one or more of the fields below
                </div>
              )
              :
              null
            }
            {
              sent ? (
                <div className="px-4 py-8 rounded-md flex flex-col items-center bg-green-500 bg-opacity-10 text-green-700 dark:text-green-300">
                  <Check size={'40'} />
                  <p className="text-sm mt-4 mb-4">Thanks! Your submission will be quickly verified and added to the list</p>
                  <button
                    className="button button--primary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              )
              :
              (
                <>
                  <div className="mb-4">
                    <label for="name" className="text--secondary font-semibold text-sm mb-2 inline-block">
                      Submit an item to:
                    </label>
                    <div className="flex">
                      {
                        categories.map((item, i) => (
                          <label className="transition p-3 bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10 rounded-md cursor-pointer inline-flex items-center mr-2 hover:bg-opacity-10 dark:hover:bg-opacity-20">
                            <input
                              type="radio"
                              name="type"
                              value={item.route}
                              checked={formItems.type === item.route}
                              onChange={handleChange}
                            />
                            <span className="ml-2">{item.name}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                  <label for="name" className="text--secondary font-semibold text-sm mb-2 inline-block">
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
                  <label for="link" className="text--secondary font-semibold text-sm mb-2 inline-block">
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
                  <label for="role" className="text--secondary font-semibold text-sm mb-2 inline-block">Description/Comment</label>
                  <input
                    id="role"
                    name="role"
                    className="text-field"
                    type="text"
                    placeholder={formItems.type === 'designers' ? 'Product Designer' : 'Discover design communities in the Tampa Bay area!'}
                    value={formItems.role}
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
                </>
              )
            }
          </div>
        )
      }
    </motion.div>
  )
}

export default LinkForm