import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2 } from 'react-feather'
import Form from '@components/SurveyForm/Form'
import Link from 'next/link'

const SurveyForm = () => {

  const [formOpen, setFormOpen] = useState(false)

  return(
    <motion.div
      className="opacity-0"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {
        !formOpen ? (
          <div className="block text-center mb-8 mt-8 px-4 py-8 rounded-md bg-green-100 dark:bg-green-500 dark:bg-opacity-20">
            <h2 className="text-center text-5xl mb-8">🎉</h2>
            <div className="text-green-700 dark:text-green-300 mb-2">
              <h3 className="font-bold text-xl mb-2">Meet designers in the area!</h3>
              <small>
              Let's get together on the first Tuesday of every month somewhere around the Tampa/St. Pete area - join your fellow designers as we grab some drinks, talk shop, or whatever else comes to mind.
              </small>
            </div>
            <Link href="/hangout">
              <a
                className="button mt-4 button--secondary"
              >
                Sign up to be notified!
              </a>
            </Link>
          </div>
        )
        :
        (
          <Form cancelForm={() => setFormOpen(!formOpen)}/>
        )
      }
    </motion.div>
  )
}

export default SurveyForm