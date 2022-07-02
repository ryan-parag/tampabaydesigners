import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader, MapPin } from 'react-feather';

const delay = 12;

export const Hero = () => {

  const options = [
    {
      name:'frog',
      classes: 'rotate-6 left-1/3 top-1/3 scale-105'
    }, {
      name:'drink',
      classes: '-rotate-12 top-6 left-4 scale-90'
    }, {
      name:'taco',
      classes: '-rotate-12 -top-4 left-20 scale-110'
    }, {
      name:'beer',
      classes: 'rotate-12 top-2 right-20 scale-95'
    }, {
      name:'donut',
      classes: '-rotate-12 top-8 right-2'
    }
  ]

  return(
    <div className="w-96 h-32 mx-auto relative animate animate-pulse">
      {
        options.map((image, i) => (
          <motion.img
            key={i}
            className={`w-24 transition opacity-0 transform absolute ${image.classes}`}
            src={`/static/events/${image.name}.png`}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3*i }}
          />
        ))
      }
    </div>
  )
}

export const SelectButton = ({ label, active }) => {
  return(
    <div className={`relative card p-4 border h-40 w-40 font-bold rounded-lg flex flex-col items-center justify-center text-center ${active ? 'border-green-500 border-2 bg-green-500 bg-opacity-20' : 'border-black border-opacity-20 dark:border-white dark:border-opacity-5'}`}>
      <div className={`w-16 h-16 card p-0 ${active ? 'text-green-600 dark:text-green-500' : 'text-current'} inline-flex items-center justify-center mb-2 rounded-full`}>
        <MapPin size={'24'}/>
      </div>
      {label}
      {
        active && (
          <div  className="bg-green-500 absolute -bottom-2 -right-2 rounded-full inline-flex items-center justify-center p-1 text-white">
            <Check size={'16'} />
          </div>
        )
      }
    </div>
  )
}

export const EventCard = () => {

  const options = ['beer', 'donut', 'taco', 'drink', 'frog']

  const getRandom = () => {
   return options[Math.floor(Math.random()*options.length)]
  }

  const randomOption = getRandom()

  return(
    <div className={`card h-32 w-32 overflow-hidden relative`}>
      <img className="rounded-lg w-24 h-24 absolute select-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition hover:rotate-6 hover:scale-110" src={`/static/events/${randomOption}.png`}/>
    </div>
  )
}

export const Row = ({ shift, end }) => {
  return(
    <motion.div
      style={{ transform: `translateX(${shift})`}}
      className="grid grid-cols-12 transi{tion gap-4 w-max transform"
      animate={{ transform: `translateX(${end})` }}
      transition={{ duration: delay }}
    >
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
      <EventCard/>
    </motion.div>
  )
}

export const RandomSection = ({ setGenerated, region, data}) => {

  const [loaded, setLoaded] = useState(false)

  const options = ['beer', 'donut', 'taco', 'drink', 'frog']

  const getRandom = () => {
    return options[Math.floor(Math.random()*options.length)]
   }
 
   const randomOption = getRandom()

  setTimeout(() => {
    setLoaded(true)
  }, 5000)

  const getRandomLocation = () => {
    const filtered = data.locations.filter(location => (location.region === region));
    const randomItem = filtered[Math.floor(Math.random()*filtered.length)]
    return randomItem
  }

  const [random, setRandom] = useState(getRandomLocation())

  return(
    <>
      {
        loaded ? (
          <div>
            <div className="mb-4">
              <button onClick={() => setGenerated(false)} className="underline">Event Randomizer</button>
              <span className="mx-2">/</span>
              <strong>Random Location</strong>
            </div>
            <div className="card px-0 py-0 my-4">
              <div className="flex flex-col lg:flex-row w-full items-center px-3 lg:px-6 py-4 lg:py-6">
                <div className="w-32 h-32 mb-4 lg:mb-0 card p-2">
                  <img className="rounded-lg transition hover:rotate-6 hover:scale-110" src={`/static/events/${randomOption}.png`}/>
                </div>
                <div className="text-center pl-0 lg:text-left flex-1 w-full lg:pl-4">
                  {
                    random && (
                      <>
                        <h3>{random.name}</h3>
                        <div className="my-2">{random.address}</div>
                        <a target="_blank" className="text-sm underline" href={`https://maps.google.com/?q=${random.name}`}>View Map</a>
                      </>
                    )
                  }
                </div>
              </div>
              <button onClick={() => setRandom(getRandomLocation())} className="p-3 text-center w-full card">Retry</button>
            </div>
            <div className="flex mt-2">
              <button onClick={() => setGenerated(false)} className="underline">Change Region ({region})</button>
            </div>
          </div>
        )
        :
        (
          <>
            <div className="card absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center text-center flex-col shadow-2xl">
              <Loader
                size={'32'}
                className="animate-spin mb-2"
              />
              <h6>Finding a location in {region}</h6>
              <button onClick={() => setGenerated(false)} className="underline mt-2">Cancel</button>
            </div>
            <div className="p-4 overflow-x-hidden grid grid-cols-1 gap-4 w-full relative card">
              <div className="absolute z-10 top-0 -left-16 bottom-0 w-32 bg-white dark:bg-black blur-xl opacity-70"/>
              <div className="absolute z-10 top-0 -right-16 bottom-0 w-32 bg-white dark:bg-black blur-xl opacity-70"/>
              <Row shift={'-200px'} end={'-724px'}/>
              <Row shift={'0px'} end={'-600px'} />
              <Row shift={'-600px'} end={'-300px'}/>
            </div>
          </>
        )
      }
    </>
  )
}

export const Selects = ({ active, setRegion}) => {

  const options = [
    {
      name: 'Tampa',
    }, {
      name: 'St. Pete',
    }
  ]

  return(
    <div className="my-4 flex items-center">
      {
        options.map(item => (
          <button className="mx-2" key={item.name} onClick={() => setRegion(item.name)}>
            <SelectButton label={item.name} active={active === item.name ? true : false}/>
          </button>
        ))
      }
    </div>
  )
}