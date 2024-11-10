import React from 'react'
import Hero from '../Components/Hero'
import CourseGroupLayout from '../Components/CourseGroupLayout'
import { useUser } from '../utils/UserContext';

function HomePage() {
  
  const { user } = useUser();
  console.log(user)

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