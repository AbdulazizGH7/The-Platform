import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import { Link } from 'react-router-dom';
import { useData } from '../utilities/DataContext';
import axios from 'axios';
 
function SectionCard({title, items}) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(title === "Courses"){
      axios.post('http://localhost:8080/api/users/courses', {coursesIds: items})
      .then(response =>{
        setData(response.data.courses)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
    else{
      axios.post('http://localhost:8080/api/users/groups', {groupsIds: items})
      .then(response =>{
        setData(response.data.groups)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
  },[])


  return (
    <>
    {!loading && <div className='section-card rounded-md text-center w-full sm:max-w-[600px] 2xl:max-w-[900px] lg:self-stretch'>
      <h2 className='text-gray-100 font-bold text-3xl py-5 sm:text-4xl'>{title}</h2>
      <hr className='w-[95%] my-0 mx-auto' />
      <div>
        <ul className='flex flex-col gap-3 mt-2'>
            {items.length > 0 ? 
                data.map((data) => (
                    <li className='first:mt-2 last:mb-4' key={data._id}>
                        <Link to={title === "Courses" ? `/course/${data._id}` : `/group/${data._id}`}><ItemCard text={title === "Courses" ? data.courseCode : data.groupName}></ItemCard></Link>
                    </li>
            )) : title === "Courses" ? <div className='min-h-[200px] flex items-center justify-center'>
            <p className='text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1'>
              No Courses Added Yet. Start <br /> Building Your Schedule Now!
            </p>
          </div> : <div className='min-h-[200px] flex items-center justify-center'>
              <p className='text-gray-100 text-xl sm:text-2xl md:text-3xl font-semibold px-1'>
              You’re Not in Any Groups.  <br /> Discover Groups to Join!
              </p>
            </div>}
        </ul>
      </div>
    </div>}
    </>
  )
}

export default SectionCard