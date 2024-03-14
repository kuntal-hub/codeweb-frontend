import React from 'react'

export default function ImageAssetCard({image}) {

  return (
    <div className='w-[90%] md:w-[43%] mx-auto md:mx-4 my-5 bg-gray-800 rounded-lg'>
        <img src={image.assetURL} alt="IMG"
        className='w-auto h-[250px] md:h-[200px] lg:h-[250px] block mx-auto rounded-lg shadow-lg'
        />
    </div>
  )
}
