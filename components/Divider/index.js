import React from 'react'
import { motion } from 'framer-motion'

export default function Divider(props) {
  return(
    <motion.div
      className={`w-0 flex flex-col justify-center opacity-0 mb-${props.marginBottom ? props.marginBottom : '0'} mt-${props.marginTop ? props.marginTop : '0'} pb-${props.paddingBottom ? props.paddingBottom : '0'} pt-${props.paddingTop ? props.paddingTop : '0'} h-${props.height ? props.height : '16'}`}
      animate={{ width: '100%', opacity: 1 }}
      transition={{ duration: 0.25, delay: 0.8 }}
    >
      <hr/>
    </motion.div>
  )
}