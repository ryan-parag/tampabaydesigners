import React from 'react'
import { motion } from 'framer-motion'
import Divider from '@components/Divider'

export default function Title({title, subtitle}) {
  return (
    <motion.div
      className="mb-8 relative opacity-0 top-8"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="text-center">
        <h1 className="font-black text-3xl md:text-5xl">{title}</h1>
        <p className="font-mono text-sm md:text-lg text--secondary">{subtitle}</p>
      </div>
      <Divider marginTop={'4'}/>
    </motion.div>
  )
}

export const Subtitle = ({children}) => {
  return (
    <motion.h4
      className="text-xl relative top-8 font-bold mt-4 mb-4 opacity-0"
      animate={{ top: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {children}
    </motion.h4>
  )
}