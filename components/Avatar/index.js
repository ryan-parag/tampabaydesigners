import React from 'react'
import Image from "next/image"

const Avatar = ({ name, img, color, sm }) => {

  const abbr = name.slice(0, 1)

  const getType = color => {
    switch(color) {
      case 'red':
        return 'bg-red-500 text-red-500 border-red-500'
        break;
      case 'blue':
        return 'bg-blue-500 text-blue-500 border-blue-500'
        break;
      case 'green':
        return 'bg-green-500 text-green-500 border-green-500'
        break;
      case 'purple':
        return 'bg-purple-500 text-purple-500 border-purple-500'
        break;
      case 'yellow':
        return 'bg-yellow-500 text-yellow-500 border-yellow-500'
        break;
      case 'indigo':
        return 'bg-indigo-500 text-indigo-500 border-indigo-500'
        break;
      case 'pink':
        return 'bg-pink-500 text-pink-500 border-pink-500'
        break;
      default:
        return 'bg-slate-500 border-slate-500'
    }
  }

  return(
    <div className={`inline-flex items-center justify-center rounded-full ${sm ? 'w-8 h-8' : 'w-12 h-12'} border border-opacity-10 bg-opacity-10 dark:bg-opacity-10 dark:border-opacity-20 ${getType(color)} relative overflow-hidden`} title={name}>
      {
        img ? (
          <Image src={img ?? ''} alt={img ?? ''} layout="fill" />
        )
        :
        (
          <span className="uppercase">{abbr}</span>
        )
      }
    </div>
  )
}

export default Avatar