import React from 'react'
import { BoxLink } from '@components/Box'
import { BoxAnchor } from '@components/Box'
import { truncateString } from '@utils/text'
import { Avatar } from '@components/PageIcon'
import moment from 'moment'
import Link from 'next/link'
import Tag from '@components/Tag'

const ListItem = ({ children, title, description, href, awaiting }) => {
  return(
    <BoxLink p={'0'} href={href}>
      <div className="flex items-center">
        {
          children && (
            <div className="relative inline-flex py-3 px-4 mr-4">
              { children }
              <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
              <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
            </div>
          )
        }
        {
          title && (
            <div className="flex flex-1 flex-col md:flex-row items-start md:items-center md:justify-between pr-4">
              <h4 className="mr-4">
                { title }
              </h4>
              {
                awaiting && (
                  <span
                    className="md:ml-2 mt-1 md:mt-0 inline-flex items-center tracking-wider text-xs uppercase font-sans bg-yellow-500 bg-opacity-10 text-yellow-700 dark:text-yellow-300 rounded-full px-2 py-0.5"
                  >
                    🚀 Coming Soon
                  </span>
                )
              }
            </div>
          )
        }
        {
          description && (
            <span>{ description }</span>
          )
        }
      </div>
    </BoxLink>
  )
}

export const ListGroupItem = ({ data }) => {
  return(
    <BoxAnchor href={data.link} title={`${data.name} - ${data.description}`}>
      <div className="flex items-start">
        <div className="relative inline-flex py-1 px-0">
          <img
            src={data.logo}
            width={'48'}
            className="relative z-10 rounded-full"
          />
          {
            data.type && (
              <div className="w-6 h-6 shadow-lg rounded-full bg-white dark:bg-black absolute -bottom-1 -right-1 z-20">
                {
                  data.type === 'Slack' && (
                    <svg className="relative z-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.3245 27.965C15.3245 29.7086 13.9164 31.1179 12.1742 31.1179C10.4319 31.1179 9.0238 29.7086 9.0238 27.965C9.0238 26.2214 10.4319 24.8121 12.1742 24.8121H15.3245V27.965ZM16.8997 27.965C16.8997 26.2214 18.3078 24.8121 20.05 24.8121C21.7923 24.8121 23.2004 26.2214 23.2004 27.965V35.8472C23.2004 37.5908 21.7923 39 20.05 39C18.3078 39 16.8997 37.5908 16.8997 35.8472V27.965Z" fill="currentColor" className="text-black dark:text-white"/>
                      <path d="M20.0501 15.3057C18.3079 15.3057 16.8997 13.8965 16.8997 12.1529C16.8997 10.4092 18.3079 9 20.0501 9C21.7923 9 23.2005 10.4092 23.2005 12.1529V15.3057H20.0501ZM20.0501 16.9061C21.7923 16.9061 23.2005 18.3153 23.2005 20.0589C23.2005 21.8025 21.7923 23.2118 20.0501 23.2118H12.1504C10.4081 23.2118 9 21.8025 9 20.0589C9 18.3153 10.4081 16.9061 12.1504 16.9061H20.0501Z" fill="currentColor" className="text-black dark:text-white"/>
                      <path d="M32.6754 20.0589C32.6754 18.3153 34.0836 16.9061 35.8258 16.9061C37.568 16.9061 38.9761 18.3153 38.9761 20.0589C38.9761 21.8025 37.568 23.2118 35.8258 23.2118H32.6754V20.0589ZM31.1003 20.0589C31.1003 21.8025 29.6922 23.2118 27.9499 23.2118C26.2077 23.2118 24.7996 21.8025 24.7996 20.0589V12.1529C24.7996 10.4092 26.2077 9 27.9499 9C29.6922 9 31.1003 10.4092 31.1003 12.1529V20.0589V20.0589Z" fill="currentColor" className="text-black dark:text-white"/>
                      <path d="M27.9499 32.6943C29.6922 32.6943 31.1003 34.1035 31.1003 35.8472C31.1003 37.5908 29.6922 39 27.9499 39C26.2077 39 24.7996 37.5908 24.7996 35.8472V32.6943H27.9499ZM27.9499 31.1179C26.2077 31.1179 24.7996 29.7086 24.7996 27.965C24.7996 26.2214 26.2077 24.8121 27.9499 24.8121H35.8497C37.5919 24.8121 39 26.2214 39 27.965C39 29.7086 37.5919 31.1179 35.8497 31.1179H27.9499Z" fill="currentColor" className="text-black dark:text-white"/>
                    </svg>
                  )
                }
                {
                  data.type === 'Discord' && (
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M29.7032 11.781C27.9186 11.026 26.0048 10.4697 24.0039 10.1511C23.9674 10.1449 23.931 10.1603 23.9123 10.191C23.6661 10.5946 23.3935 11.1212 23.2026 11.5351C21.0505 11.238 18.9094 11.238 16.8014 11.5351C16.6104 11.112 16.3279 10.5946 16.0807 10.191C16.0619 10.1613 16.0255 10.1459 15.9891 10.1511C13.9892 10.4686 12.0755 11.0249 10.2898 11.781C10.2743 11.7872 10.261 11.7974 10.2523 11.8107C6.62229 16.8112 5.62789 21.6888 6.11571 26.506C6.11792 26.5295 6.13226 26.5521 6.15213 26.5664C8.54708 28.1881 10.867 29.1727 13.1438 29.8253C13.1803 29.8355 13.2189 29.8232 13.2421 29.7956C13.7806 29.1174 14.2607 28.4023 14.6724 27.6503C14.6967 27.6062 14.6735 27.554 14.6238 27.5366C13.8623 27.2702 13.1372 26.9454 12.4397 26.5766C12.3845 26.5469 12.3801 26.4742 12.4309 26.4393C12.5776 26.3379 12.7245 26.2324 12.8646 26.1258C12.89 26.1064 12.9253 26.1023 12.9551 26.1146C17.5375 28.0437 22.4985 28.0437 27.0268 26.1146C27.0566 26.1013 27.0919 26.1054 27.1184 26.1248C27.2586 26.2314 27.4054 26.3379 27.5533 26.4393C27.604 26.4742 27.6007 26.5469 27.5455 26.5766C26.848 26.9526 26.1229 27.2702 25.3603 27.5356C25.3106 27.553 25.2885 27.6062 25.3128 27.6503C25.7333 28.4012 26.2134 29.1163 26.742 29.7945C26.7641 29.8232 26.8038 29.8355 26.8403 29.8253C29.1282 29.1727 31.4481 28.1881 33.843 26.5664C33.864 26.5521 33.8772 26.5305 33.8794 26.507C34.4633 20.9378 32.9016 16.1002 29.7396 11.8117C29.7319 11.7974 29.7186 11.7872 29.7032 11.781ZM15.3567 23.5728C13.9771 23.5728 12.8403 22.4049 12.8403 20.9706C12.8403 19.5364 13.955 18.3685 15.3567 18.3685C16.7694 18.3685 17.8951 19.5466 17.873 20.9706C17.873 22.4049 16.7583 23.5728 15.3567 23.5728ZM24.6605 23.5728C23.281 23.5728 22.1442 22.4049 22.1442 20.9706C22.1442 19.5364 23.2589 18.3685 24.6605 18.3685C26.0732 18.3685 27.199 19.5466 27.1769 20.9706C27.1769 22.4049 26.0732 23.5728 24.6605 23.5728Z" fill="currentColor" className="text-black dark:text-white"/>
                      </g>
                    </svg>
                  )
                }
              </div>
            )
          }
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
        </div>
        <div className="pl-4 flex-1">
          <div className="mb-2 flex-col flex items-start">
            <h4>{data.name}</h4>
            <div className="text-sm text-black text-opacity-50 dark:text-white dark:text-opacity-50">
              {truncateString(data.description, 100)}
            </div>
          </div>
          <div className="flex">
            {
              data.type && (
                <Tag
                  mr={'2'}
                  color={data.type.toLowerCase() === 'discord' ? 'purple' : 'yellow'}
                >
                  {data.type}
                </Tag>
              )
            }
            <Tag>
              Join Group
            </Tag>
          </div>
        </div>
      </div>
    </BoxAnchor>
  )
}

export const SlackGroup = ({ data }) => {
  return(
    <ListGroupItem data={data}/>
  )
}

export const Group = ({ data }) => {
  return(
    <ListGroupItem data={data}/>
  )
}

const CalendarItem = ({day, num, month, year}) => {
  return(
    <div className="relative z-10 rounded-lg text-center bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm overflow-hidden shadow flex flex-col w-full">
      <div className="text-xs font-semibold py-1 bg-red-500 uppercase text-white font-mono tracking-widest">{day}</div>
      <div className="text-lg text-black dark:text-white md:text-2xl font-extrabold py-1 font-mono">{num}</div>
      <div className="text-xs pb-1 text-black text-opacity-50 dark:text-white dark:text-opacity-50 font-mono">{month}{' '}{year}</div>
    </div>
  )
}

export const Event = ({ data }) => {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const formatDate = date => {
    let d = new Date(date)
    let year = d.getFullYear()
    const dateObj = {
      dayString: dayNames[moment(date).day()],
      numString: moment(date).date(),
      monthString: monthNames[moment(date).month()],
      yearString: year
    }
    return dateObj
  }

  return(
    <BoxAnchor href={data.link} title={`${data.name} - ${data.description}`} mt={'0'} mb={'0'}>
      <div className="flex items-start">
        <div className="relative items-start flex-col inline-flex py-1 px-0 w-20">
          <CalendarItem
            day={formatDate(data.date).dayString}
            num={formatDate(data.date).numString}
            month={formatDate(data.date).monthString}
            year={formatDate(data.date).yearString}
          />
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
        </div>
        <div className="pl-4 flex-1">
          <div className="mb-2 flex-col flex items-start">
            <h4>{data.upcoming && 'Upcoming - '}{data.name}</h4>
            <div className="text-sm mb-2 text-black text-opacity-50 dark:text-white dark:text-opacity-50">
              {data.description}
            </div>
            <small>
              Hosted by
                <Tag ml={'2'}>
                  {data.org}
                </Tag>
            </small>
          </div>
        </div>
      </div>
    </BoxAnchor>
  )
}

export const Credit = ({ data }) => {

  return(
    <BoxAnchor href={data.link} title={`${data.name} - ${data.description}`}>
      <div className="flex items-start">
        <div className="relative inline-flex py-1 px-0">
          <img
            src={`/static/credits/${data.logo}`}
            width={'48'}
            className="relative z-10 rounded-full"
          />
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-red-500 to-blue-500 top-0 bottom-0 left-0 right-0 rounded-full z-0"></div>
          <div className="absolute filter opacity-40 blur-lg bg-gradient-to-tl from-yellow-500 to-purple-500 top-0 bottom-0 left-0 right-0 rounded-full z-0 transform rotate-6"></div>
        </div>
        <div className="pl-4 flex-1">
          <div className="mb-2 flex-col flex items-start">
            <h4>{data.name}</h4>
            <div className="text-sm text-black text-opacity-50 dark:text-white dark:text-opacity-50">
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </BoxAnchor>
  )
}

export const Interview = ({item}) => {

  const getRandomGradient = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length)
    const item = arr[randomIndex]
    return item
  }

  const colors = ['yellow', 'pink', 'red', 'indigo', 'green', 'blue', 'green', 'purple']


  return(
    <Link
      href={`interviews/${item.slug}`}
    >
      <a
        className="bg-gray-400 bg-opacity-10 rounded border border-gray-400 border-opacity-10 dark:bg-gray-500 dark:bg-opacity-10 dark:border-gray-400 dark:border-opacity-10 backdrop-filter backdrop-blur-2xl relative flex flex-col-reverse justify-items-start items-start p-4 mb-4 w-full h-96 transform transition shadow-sm hover:shadow-xl hover:scale-105"
      >
        <div className="relative z-10">
          <h4 className="block mt-0 mb-0">{item.frontmatter.name}</h4>
          <span className="text-sm">{moment(item.frontmatter.date).format('MMM DD, YYYY')}</span>
        </div>
        <div
          className="absolute -z-5 top-0 bottom-0 left-0 right-0 rounded opacity-50"
          style={{
            backgroundImage: `url(${item.frontmatter.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>
        <div
          className="absolute z-5 top-0 bottom-0 left-0 right-0 rounded bg-gradient-to-t from-white to-transparent dark:from-black"
        ></div>
        <div
          className={`absolute z-0 opacity-20 bg-blend-multiply top-0 bottom-0 left-0 right-0 rounded bg-${getRandomGradient(colors)}-500`}
        ></div>
        <div
          className={`absolute transform -z-5 top-0 bottom-0 left-0 filter blur opacity-10 right-0 rounded bg-gradient-to-t from-${getRandomGradient(colors)}-500 via-${getRandomGradient(colors)}-500 to-${getRandomGradient(colors)}-500`}
        ></div>
      </a>
    </Link>
  )
}

export const LinkCard = ({href, tint, type, label}) => {
  return(
    <BoxLink href={href} p={'0'} mb={'0'} mt={'0'} tint={tint}>
      <div className="flex flex-col text-center items-center py-8 px-4">
      <Avatar type={type} mb={'4'} />
        <h5 className='text-base md:text-base xl:text-xl'>{label}</h5>
      </div>
    </BoxLink>
  )
}

export default ListItem