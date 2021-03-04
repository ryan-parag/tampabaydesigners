import React from 'react'
import { Loader } from 'react-feather'
import { motion } from 'framer-motion'

export default function Loading({children}) {
  return (
    <div className="items-center flex flex-col py-12 px-4 rounded-md text-custom-orange">
      <motion.div
        className="inline-block"
        animate={{ rotate: [0, 359] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      >
        <Loader
          size={'40'}
        />
      </motion.div>
      <p className="mt-4 text-center text-sm">
        {children}
      </p>
    </div>
  )
}