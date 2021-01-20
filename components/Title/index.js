import React from 'react'

export default function Title({title, subtitle}) {
  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h1 className="font-black text-3xl md:text-5xl">{title}</h1>
        <p className="font-mono text-sm md:text-lg text-gray-600 dark:text-white dark:text-opacity-70">{subtitle}</p>
      </div>
      <hr/>
    </div>
  )
}