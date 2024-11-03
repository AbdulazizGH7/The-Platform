import React from 'react'

function Navbar() {
  return (
    <div className='sticky top-0 left-0 right-0 px-6 py-4 mx-auto z-10 backdrop-blur-sm' >
    <nav className='flex justify-between items-center mb-4'>
        <h1 className='text-gray-100 font-semibold text-lg lg:text-xl  '>The Platform</h1>
        <ul className='flex gap-5'>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Home</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Courses</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Groups</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl'>Log out</li>
        </ul> 
    </nav>
    <hr />
    </div>
  )
}

export default Navbar