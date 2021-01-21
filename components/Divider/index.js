import React from 'react'
import { motion } from 'framer-motion'

export default function Divider() {
  return(
    <motion.div
      className="w-0 opacity-0"
      animate={{ width: '100%', opacity: 1 }}
      transition={{ duration: 0.25, delay: 0.8 }}
    >
      <hr/>
    </motion.div>
  )
}