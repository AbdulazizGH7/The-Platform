import React from 'react'
import SectionCard from './SectionCard'
import Button from './Button'
import { Link } from 'react-router-dom'
import { useUser } from '../utils/UserContext';
import { useState, useEffect } from 'react';
import userData from '../data/users.json';

function CourseGroupLayout() {

  const {user} = useUser()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() =>{
    if(user){
      const userDetails = userData.users.find((u) => u.username === user.name)
      setUserInfo(userDetails)
    }
  },[])

  if(userInfo === null)
    return


  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center w-full px-4 lg:flex-row lg:justify-between min-h-[600px]" id='courseGroup'>
        <SectionCard title={"Courses"} items={userInfo.courses}></SectionCard>
        <div className="vl self-stretch hidden lg:block"></div>
        <SectionCard title={"Groups"} items={userInfo.groups}></SectionCard>
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