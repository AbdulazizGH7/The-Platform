import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
        <h1 className="text-gray-100 text-4xl">Login page</h1>
        <input placeholder='Enter your name...'></input>
        <br />
        <Link to="/home"><button className='bg-white p-10 mt-3'>Log in</button></Link>
    </div>
  )
}

export default LoginPage