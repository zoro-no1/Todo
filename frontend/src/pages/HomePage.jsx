import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='w-screen pt-4 bg-blue-200 h-screen' >
        <h1 className='w-4/5 m-auto text-3xl md:text-6xl  font-mono' >
            Get Started
        </h1>
        <h4 className=' mt-3 md:mt-9 text-lg md:text-3xl font-mono w-4/5 m-auto'>
            Create Task . Track Progress
        </h4>
        <div className='w-3/4 m-auto'>
        <img className='lg:size-1/2  m-auto' src="/walcome.webp" alt="#" />
        </div>
        <Link to="/auth" >

        <div className='w-1/3 m-auto h-16 text-center bg-orange-500 border rounded-xl text-3xl font-medium'>
            Signin
        </div>
        </Link>



    </div>
  )
}

export default HomePage