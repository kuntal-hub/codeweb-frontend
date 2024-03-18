import React, { useState } from 'react'
import ShowImageDetails from './ShowImageDetails';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default function ImageAssetCard({ image }) {
  const [showImageDeatil, setShowImageDetails] = useState(false);
  const dispatch = useDispatch();

  const copyToClipBord = ()=>{
    window.navigator.clipboard.writeText(image.assetURL)
    dispatch(addNotification({text:"URL coppid Succesfully!",type:"success"}))
}

  return (
    <>
      <div className='m-0 p-0 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hovarable'>
      <img src={image.assetURL.replace("upload/", "upload/q_80/")} style={{ width: '100%' }}
        className='hover:rounded-lg transition-all duration-300 ease-in-out'
        alt='image asset'
        onClick={() => setShowImageDetails(true)}
      />
        <button onClick={copyToClipBord} title='Copy URL'
        className='material-symbols-outlined hidden absolute top-2 right-2 text-3xl text-white copyBtn'
        >
          content_copy
        </button>
      </div>
      {showImageDeatil && <ShowImageDetails showImageDeatil={showImageDeatil} setShowImageDetails={setShowImageDetails} image={image} />}
    </>
  )
}
