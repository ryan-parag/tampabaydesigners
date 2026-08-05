import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const LightboxImage = ({
  src,
  alt,
  wrapperClassName = '',
  motionClassName = '',
  delay = 0,
  imageClassName = 'object-cover',
  onOpen
}) => {
  return (
    <div className={wrapperClassName}>
      <motion.button
        type="button"
        className={`group text-white transition transform hover:scale-105 hover:shadow-lg active:scale-[97%] relative w-full h-full cursor-pointer ${motionClassName}`}
        onClick={onOpen}
        initial={{ opacity: 0, top: 20 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 0.3, delay, ease: 'easeInOut', type: 'spring', stiffness: 150 }}
      >
        <div className="transition opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 inline-flex bg-black/70 p-1 items-center justify-center rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
        </div>
        <div className="absolute inset-0">
          <Image src={src} alt={alt} fill className={imageClassName} />
        </div>
      </motion.button>
    </div>
  )
}

export default LightboxImage
