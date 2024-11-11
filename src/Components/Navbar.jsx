import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {

  const location = useLocation();

  return (
    <>
    <nav className='flex justify-between items-center mb-4 mt-2.5'>
        <Link to={"/home"}><h1 className='text-gray-100 font-semibold text-lg lg:text-xl'>The Platform</h1></Link>
        <ul className='flex gap-5'>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item '><Link to={"/home"}>Home</Link></li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>{location.pathname === "/home" ? (
              <a href='#courseGroup'>Courses</a>
            ) : (
              <Link to={"/home"}>Courses</Link>
            )}</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl hidden sm:list-item'>{location.pathname === "/home" ? (
              <a href='#courseGroup'>Groups</a>
            ) : (
              <Link to={"/home"}>Groups</Link>
            )}</li>
            <li className='text-gray-100 font-light text-lg lg:text-xl'><Link to={"/login"}>Log out</Link></li>
        </ul> 
    </nav>
    <hr />
    </>
  )
}

export default Navbar