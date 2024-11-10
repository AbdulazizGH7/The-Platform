import React from 'react'
import SectionCard from './SectionCard'
import Button from './Button'
import { Link } from 'react-router-dom'

function CourseGroupLayout() {

    const items = {
        Courses:[],
        Groups:["Sec-11", "Sec7"]
    }

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center w-full px-4 lg:flex-row lg:justify-between min-h-[600px]" id='courseGroup'>
        <SectionCard title={"Courses"} items={items.Courses}></SectionCard>
        <div className="vl self-stretch hidden lg:block"></div>
        <SectionCard title={"Groups"} items={items.Groups}></SectionCard>
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