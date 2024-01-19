import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='my-8'>
      <h1 className='text-7xl'>Welcome to FileDrive</h1>
      <h2 className='text-4xl my-8'>
         Manage your files with ease!
      </h2>
          <p className='text-center my-5 text-5xl '>Get Started</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700 flex justify-center text-2xl'>Sign Up</span>
          </Link>
    </div>

  )
}
