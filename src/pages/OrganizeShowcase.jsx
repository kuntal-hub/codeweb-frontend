import React from 'react'
import { Link } from 'react-router-dom'

export default function OrganizeShowcase() {
  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-gray-950 m-0 p-0'>
        <div className='text-center my-[30vh] w-full h-full text-white font-bold text-2xl sm:text-4xl'>
            Page under construction
            <p className=' text-sm w-screen text-center mt-5'>
              Go back to <Link className='text-blue-700 hover:underline' to='/'>Home</Link>
            </p>
        </div>
    </div>
  )
}
