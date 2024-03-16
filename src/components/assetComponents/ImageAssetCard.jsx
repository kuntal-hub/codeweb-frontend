import React, { useState } from 'react'
import ShowImageDetails from './ShowImageDetails';

export default function ImageAssetCard({ image }) {
  const [showImageDeatil, setShowImageDetails] = useState(false);

  return (
    <>
      <img src={image.assetURL.replace("upload/", "upload/q_80/")} style={{ width: '100%' }}
        className='hover:rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'
        alt='image asset'
        onClick={() => setShowImageDetails(true)}
      />
      {showImageDeatil && <ShowImageDetails showImageDeatil={showImageDeatil} setShowImageDetails={setShowImageDetails} image={image} />}
    </>
  )
}
