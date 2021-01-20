import React from 'react'
import { motion } from 'framer-motion'

export default function Title({title, subtitle}) {
  return (
    <motion.div
      className="mb-8 relative opacity-0 top-8"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h1 className="font-black text-3xl md:text-5xl">{title}</h1>
        <p className="font-mono text-sm md:text-lg text-gray-600 dark:text-white dark:text-opacity-70">{subtitle}</p>
      </div>
      <hr/>
    </motion.div>
  )
}