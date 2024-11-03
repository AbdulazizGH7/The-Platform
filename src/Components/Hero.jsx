import React from 'react'
import Button from './Button'
import Computer from "../assets/Images/Computer.svg"
import { useState, useEffect } from 'react'

function Hero() {

  const [width, setWidth] = useState(window.innerWidth)
  
  useEffect(() =>{
    window.addEventListener("resize", () => setWidth(window.innerWidth))
    
    return () =>{
      window.removeEventListener("resize", () => setWidth(window.innerWidth))
    }
  },[])

  return (
    <section className='flex justify-between items-center mt-8' >
      <div className='md:w-1/2' >
        <h1 className='text-gray-100 font-bold text-4xl mb-2 lg:text-5xl'>The Only Platform <br /> You Need!</h1>
        <p className='text-gray-100 mb-2 lg:text-xl'>Your One-Stop Platform for <br /> KFUPM Course Information <br /> and Resources</p>
        <Button title='Explore'
        px={width < 1024 ? '8' : '12'}
        py='2'
        textSize='xl'></Button>
      </div>
      <img src={Computer}
      alt="Computer"
      className='hidden sm:block w-1/2 object-contain h-auto sm:max-w-64 md:max-w-md lg:max-w-md xl:max-w-xl' />
    </section>
  )
}

export default Hero