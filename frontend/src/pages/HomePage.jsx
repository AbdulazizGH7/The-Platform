import React from 'react'
import Hero from '../Components/Hero'
import CourseGroupLayout from '../Components/CourseGroupLayout'

function HomePage() {

  return (
    <>
        <div className='h-[85vh]'>
          <Hero />
        </div>
        <CourseGroupLayout></CourseGroupLayout>
    </>
  )
}

export default HomePage