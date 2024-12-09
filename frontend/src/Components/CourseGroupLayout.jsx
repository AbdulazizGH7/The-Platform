import React from 'react'
import SectionCard from './SectionCard'
import Button from './Button'
import { Link } from 'react-router-dom'
import {useUser} from '../contexts/UserContext';

function CourseGroupLayout() {

  const {user} = useUser()

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center w-full px-4 lg:flex-row lg:justify-between min-h-[600px]" id='courseGroup'>
        <SectionCard title={"Courses"} items={user.courses}></SectionCard>
        <div className="vl self-stretch hidden lg:block"></div>
        <SectionCard title={"Groups"} items={user.groups}></SectionCard>
      </div>
      <div className='mt-6 mb-32 text-center'>
        <Link to={"/courseSearch"}>
        <Button title='Search Course' textSize='xl' px='10'></Button>
        </Link>
      </div>
    </>

  )
}

export default CourseGroupLayout