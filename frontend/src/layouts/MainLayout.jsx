import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Navbar'
import Footer from '../Components/Footer'

function MainLayout() {
  return (
    <>
        <div className='flex flex-col min-h-lvh px-6 py-4 mr-auto ml-auto lg:px-8 xl:px-12' id='main'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    </>
  )
}

export default MainLayout