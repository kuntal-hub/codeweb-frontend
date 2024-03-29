import React from 'react'

export default function ExploreProfileLoadingCard() {
  return (
    <div className='text-white w-full p-2 min-[450px]:p-3 bg-gray-900 rounded-lg flex flex-col my-2'>
    <div className='m-0 p-0 mb-2 min-[450px]:mb-3 flex flex-nowrap justify-start'>
        <div className='w-[70px] h-[70px] bg-gray-700 rounded-md'>

        </div>
    </div>
    <div className='m-0 p-0'>
        <div className='flex w-full flex-wrap justify-between'>
            <div className='w-[48%] bg-gray-700 rounded-md'>
                <img src={"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"}
                    alt="img"
                    className={`w-full opacity-0 rounded-md`} /></div>

            <div className='w-[48%] bg-gray-700 rounded-md'>
                <img src={"https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"}
                    alt="img"
                    className={`w-full opacity-0 rounded-md`} /></div>
        </div>
    </div>

</div>
  )
}
