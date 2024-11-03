import React from 'react'

function Navbar() {
  return (
    <>
    <nav className='flex justify-between items-center mb-4 mt-2.5'>
        <h1 className='text-gray-100 font-semibold text-lg lg:text-xl  '>The Platform</h1>
        <ul className='flex gap-5'>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Home</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Courses</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Groups</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl'>Log out</li>
        </ul> 
    </nav>
    <hr />
    </>
  )
}

export default Navbar