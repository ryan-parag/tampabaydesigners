import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Shared entrance animation. Visibility must never depend on a static
// `opacity-0` class — users who prefer reduced motion (or whose tab
// throttles animation frames) get fully visible content immediately.
const FadeIn = ({ as = 'div', delay = 0, className, children }) => {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </Tag>
  )
}

export default FadeIn
