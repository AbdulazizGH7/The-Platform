import React from 'react'
import SectionCard from './SectionCard'

function CourseGroupLayout() {

    const items = {
        Courses:["SWE-206","COE-292", "COE-301"],
        Groups:["Sec-11", "Sec7"]
    }

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full px-4 mt-64 lg:flex-row lg:justify-between ">
        <SectionCard title={"Courses"} items={items.Courses}></SectionCard>
        <div className="vl self-stretch hidden lg:block"></div>
        <SectionCard title={"Groups"} items={items.Groups}></SectionCard>
    </div>
  )
}

export default CourseGroupLayout