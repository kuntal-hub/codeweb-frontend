import React from 'react'

export default function ShowAsset({setShowAsset}) {
  return (
    <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
      <div className='GB-cointainer p-1 w-full h-screen-60px'>
          <div className='w-full h-full bg-gray-950 md:w-[80vw] lg:w-[70vw]'>
              <button className='block w-full float-right material-symbols-outlined text-white'>
                close
              </button>
          </div>
      </div>
    </div>
  )
}
