import React from 'react'
import SubstackSubscribe from '@components/SubstackSubscribe'

export default function Footer() {
  return(
    <footer className="mt-4 pt-20 pb-24 mb-4 px-4 border-t-2 border-gray-100 dark:border-white dark:border-opacity-10 text-center text-gray-500 dark:text-white dark:text-opacity-50">
      <div className="inline-flex items-center mb-8">
        <div className="w-10 h-10 bg-black bg-opacity-20 p-1 dark:bg-white dark:bg-opacity-20 transform -rotate-6 rounded-lg inline-flex items-center justify-center relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 80 80">
            <g fill="var(--white)" clipPath="url(#clip0)">
              <path fillOpacity="1" fillRule="evenodd" d="M20.796 52.265L18.65 61.35l9.085-2.146 33.48-33.48-6.94-6.938-33.479 33.48zm8.411 10.7a2 2 0 00.955-.531l35.295-35.296a2 2 0 000-2.828l-9.767-9.767a2 2 0 00-2.828 0L17.566 49.838a2 2 0 00-.532.955L14.012 63.58a2 2 0 002.407 2.407l12.788-3.022z" clipRule="evenodd"/>
              <path fillOpacity="1" d="M29.521 59.45a1 1 0 01-1.414 0l-3.071-3.072a1 1 0 010-1.414l32.65-32.65a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-32.65 32.65zM21.296 63.936a1 1 0 01-1.415 0l-3.071-3.072a1 1 0 010-1.414l.508-.508a1 1 0 011.414 0l3.072 3.072a1 1 0 010 1.414l-.508.508zM37.03 24.434L26.94 14.345a2 2 0 00-2.828 0l-9.767 9.767a2 2 0 000 2.829l10.09 10.088 2.828-2.828-8.675-8.675 6.938-6.938 1.185 1.184-3.47 3.47 1.415 1.414 3.469-3.47 2.599 2.6-3.47 3.468 1.415 1.415 3.469-3.47 2.063 2.063 2.828-2.828zM45.785 52.724l8.689 8.688 6.938-6.938-1.184-1.185-3.47 3.47-1.414-1.415 3.47-3.47-2.6-2.598-3.468 3.47-1.415-1.415 3.47-3.469-2.077-2.077 2.828-2.828 10.103 10.102a2 2 0 010 2.829l-9.767 9.767a2 2 0 01-2.829 0L42.957 55.552l2.828-2.828z"/>
            </g>
          </svg>
        </div>
        <span className="font-bold ml-4">Tampa Bay Designers</span>
      </div>
      <p className="text-sm mb-8">Have a fun idea to add? Looking for designer interviews, job tips, and more?</p>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <a className="button button--primary button--sm mb-8 mr-2" href="https://tampabaydesigners.substack.com/welcome" target="_blank">Subscribe to the Newsletter</a>
        <a className="button button--secondary button--sm mb-8" href="https://github.com/TampaBayDesigners/tampabaydesigners" target="_blank">Contribute on GitHub</a>
      </div>
      <p className="text-sm mb-4">Made by <a href="https://ryanparag.com/">Ryan Parag</a>, built with <a href="https://nextjs.org/">NextJS</a>, <a href="https://tailwindcss.com/">Tailwind</a>, <a href="https://airtable.com/">Airtable</a>, and <a href="https://www.netlify.com/">Netlify</a>.</p>
    </footer>
  )
}