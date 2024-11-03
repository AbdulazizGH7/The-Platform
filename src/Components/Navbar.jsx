import React from 'react'

function Navbar() {
  return (
    <nav className='sticky top-0 left-0 right-0 flex justify-between items-center px-6 py-4 mx-auto z-10 backdrop-blur-sm' styles={{ maxWidth: '2000px', width: '98%' }}>
        <h1 className='text-gray-100 font-semibold text-lg lg:text-xl  '>The Platform</h1>
        <ul className='flex gap-5'>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Home</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Courses</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>Groups</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl'>Log out</li>
        </ul>
    </nav>
  )
}

export default Navbar