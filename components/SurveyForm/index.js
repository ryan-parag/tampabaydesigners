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
            <Edit2 size={'32'} className="inline-block mb-4 text-green-500"/>
            <p className="text-green-700 dark:text-green-300 mb-2">
              <small>
              Are you looking to receive feedback on your portfolio or chat with other local designers about their portfolios? Fill out the form!
              </small>
            </p>
            <Link href="/portfolio-reviews">
              <a
                className="button mt-4 button--secondary"
              >
                Interested in Portfolio Reviews?
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