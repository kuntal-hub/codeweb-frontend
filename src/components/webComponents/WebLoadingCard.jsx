import React from 'react'

export default function WebLoadingCard() {
  return (
    
    <div className='text-white w-full p-2 min-[450px]:p-3  rounded-lg flex flex-col my-2'>
        <div className='m-0 p-0 bg-gray-700 w-full rounded-md' >
            <img src="https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg" alt="img"
            className='w-full h-auto opacity-0' />
        </div>
        <div className='flex flex-nowrap justify-start py-4'>
            <div className='rounded-lg w-10 min-[550px]:w-[50px] lg:w-10 xl:w-[50px] h-10 min-[550px]:h-[50px] lg:h-10 xl:h-[50px]  bg-gray-700'>

            </div> 
        </div>

    </div>
    
  )
}
