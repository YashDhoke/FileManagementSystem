import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
     <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Signup</h1>

      <form className='flex flex-col gap-4 '>
          <input type="text" placeholder='username' className='  border p-3 rounded-lg' id = "username" /> 
          <input type="text" placeholder='email' className='border p-3 rounded-lg'/> 
          <input type="text" placeholder='password' className='border p-3 rounded-lg'/> 

          <button className='bg-slate-300 p-3 rounded-lg uppercase hover:opacity-35 text-black '>Signup</button>
      </form>
     <div className='flex gap-4 mt-5'>
         <p>Have an account?</p>
         <Link to = "/sign-in">
            <span className='text-black'>Signin</span>
         </Link>
     </div>
    </div>
  )
}
