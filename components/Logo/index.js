import React from 'react'
import siteConfig from '../../siteconfig.json'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo(props) {
  return(
    <Link href="/">
      <a className={`inline-flex items-center ${props.small ? 'rounded-lg' : 'rounded-xl'} transition`}>
        <div className="inline-flex items-center">
          {
            props.mono ? (
              <div
                className={`${props.small ? 'h-8 w-8' : 'w-12 h-12'} transform -rotate-6 ${props.small ? 'rounded-lg' : 'rounded-xl'} icon items-center justify-center shadow relative bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 80 80">
                  <g fill="currentColor" className="text-black dark:text-white" clipPath="url(#clip0)">
                    <path fillOpacity="1" fillRule="evenodd" d="M20.796 52.265L18.65 61.35l9.085-2.146 33.48-33.48-6.94-6.938-33.479 33.48zm8.411 10.7a2 2 0 00.955-.531l35.295-35.296a2 2 0 000-2.828l-9.767-9.767a2 2 0 00-2.828 0L17.566 49.838a2 2 0 00-.532.955L14.012 63.58a2 2 0 002.407 2.407l12.788-3.022z" clipRule="evenodd"/>
                    <path fillOpacity="1" d="M29.521 59.45a1 1 0 01-1.414 0l-3.071-3.072a1 1 0 010-1.414l32.65-32.65a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-32.65 32.65zM21.296 63.936a1 1 0 01-1.415 0l-3.071-3.072a1 1 0 010-1.414l.508-.508a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-.508.508zM37.03 24.434L26.94 14.345a2 2 0 00-2.828 0l-9.767 9.767a2 2 0 000 2.829l10.09 10.088 2.828-2.828-8.675-8.675 6.938-6.938 1.185 1.184-3.47 3.47 1.415 1.414 3.469-3.47 2.599 2.6-3.47 3.468 1.415 1.415 3.469-3.47 2.063 2.063 2.828-2.828zM45.785 52.724l8.689 8.688 6.938-6.938-1.184-1.185-3.47 3.47-1.414-1.415 3.47-3.47-2.6-2.598-3.468 3.47-1.415-1.415 3.47-3.469-2.077-2.077 2.828-2.828 10.103 10.102a2 2 0 010 2.829l-9.767 9.767a2 2 0 01-2.829 0L42.957 55.552l2.828-2.828z"/>
                  </g>
                </svg>
              </div>
            )
            :
            (
              <div
                style={{
                  background: 'linear-gradient(45deg, #FEC100, #C21600)'
                }}
                className={`${props.small ? 'h-8 w-8' : 'w-12 h-12'} transform -rotate-6 ${props.small ? 'rounded-lg' : 'rounded-xl'} icon items-center justify-center shadow relative`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 80 80">
                  <g fill="currentColor" className="text-white" clipPath="url(#clip0)">
                    <path fillOpacity="1" fillRule="evenodd" d="M20.796 52.265L18.65 61.35l9.085-2.146 33.48-33.48-6.94-6.938-33.479 33.48zm8.411 10.7a2 2 0 00.955-.531l35.295-35.296a2 2 0 000-2.828l-9.767-9.767a2 2 0 00-2.828 0L17.566 49.838a2 2 0 00-.532.955L14.012 63.58a2 2 0 002.407 2.407l12.788-3.022z" clipRule="evenodd"/>
                    <path fillOpacity="1" d="M29.521 59.45a1 1 0 01-1.414 0l-3.071-3.072a1 1 0 010-1.414l32.65-32.65a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-32.65 32.65zM21.296 63.936a1 1 0 01-1.415 0l-3.071-3.072a1 1 0 010-1.414l.508-.508a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-.508.508zM37.03 24.434L26.94 14.345a2 2 0 00-2.828 0l-9.767 9.767a2 2 0 000 2.829l10.09 10.088 2.828-2.828-8.675-8.675 6.938-6.938 1.185 1.184-3.47 3.47 1.415 1.414 3.469-3.47 2.599 2.6-3.47 3.468 1.415 1.415 3.469-3.47 2.063 2.063 2.828-2.828zM45.785 52.724l8.689 8.688 6.938-6.938-1.184-1.185-3.47 3.47-1.414-1.415 3.47-3.47-2.6-2.598-3.468 3.47-1.415-1.415 3.47-3.469-2.077-2.077 2.828-2.828 10.103 10.102a2 2 0 010 2.829l-9.767 9.767a2 2 0 01-2.829 0L42.957 55.552l2.828-2.828z"/>
                  </g>
                </svg>
              </div>
            )
          }
          <div className={`${props.small ? 'pl-2' : 'pl-4'}`}>
            <h2 className={`${props.small ? 'text-sm' : 'text-lg'} ${props.mono ? 'text-black dark:text-white dark:text-opacity-50 text-opacity-50' : 'text-black dark:text-white dark:text-opacity-100 text-opacity-100'} tracking-wider uppercase font-sans font-bold`}>{siteConfig.title}</h2>
          </div>
        </div>
      </a>
    </Link>
  )
}

export const GroupLogo = ({ group }) => {

  const baseUrl = '/static/groups/'

  const getGroup = el => {
    switch(el) {
      case 'Design St. Pete':
        return 'design-st-pete.png'
        break;
      case 'Tampa Bay UX':
        return 'tampa-bay-ux.png'
        break;
      case 'Figma Tampa':
        return 'figma-tampa.png'
        break;
      case 'AIGA Tampa Bay':
        return 'aiga.png'
        break;
      case 'Dribbble Tampa':
        return 'dribbble-tampa.png'
        break;
      case 'Sketch Tampa':
        return 'sketch-tampa.png'
        break;
      default:
        return 'tbd.png'
    }
  }

  return(
    <img className="block w-full" src={`${baseUrl}${getGroup(group)}`} alt={group} /> 
  )
}
