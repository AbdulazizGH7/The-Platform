import React from 'react'
import ItemCard from './ItemCard'
 
function SectionCard({title, items}) {
  return (
    <div className='section-card rounded-md text-center w-full sm:max-w-[600px] 2xl:max-w-[900px] lg:self-stretch'>
      <h2 className='text-gray-100 font-bold text-3xl py-5 sm:text-4xl'>{title}</h2>
      <hr className='w-[95%] my-0 mx-auto' />
      <div>
        <ul className='flex flex-col gap-3 mt-2'>
            {items.length > 0 ? 
                items.map((item, index) => (
                    <li className='first:mt-2 last:mb-4' key={index}>
                        <ItemCard text={item}></ItemCard>
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
    </div>
  )
}

export default SectionCard