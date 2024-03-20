import React, { useState,memo } from 'react'
import ShowImageDetails from './ShowImageDetails';
import { useDispatch,useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { assetService } from '../../apiServices/asset';
import UpdateAsset from './UpdateAsset';

export default memo(function ImageAssetCard({ image,copyOnly=false,getPublicAssets }) {
  const [showImageDeatil, setShowImageDetails] = useState(false);
  const [showUpdateAsset, setShowUpdateAsset] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const copyToClipBord = ()=>{
    window.navigator.clipboard.writeText(image.assetURL)
    dispatch(addNotification({text:"URL coppid Succesfully!",type:"success"}))
}

  const deleteAsset = async ()=>{
    if(copyOnly) return;
    if(!window.confirm("Are you sure you want to delete this asset?")) return
    const response = await assetService.deleteAssetById({assetId:image._id})
    if (response.status <400 && response.data ) {
      dispatch(addNotification({text:"Asset Deleted Succesfully!",type:"success"}))
      if (getPublicAssets) {
        getPublicAssets(1)
      } else {
        window.location.reload()
      }
    }
  }

  return (
    <>
      <div className='m-0 p-0 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer hovarable'>
      <img src={image.assetURL.replace("upload/", "upload/q_80/")} style={{ width: '100%' }}
        className='hover:rounded-lg transition-all duration-300 ease-in-out'
        alt='image asset'
        onClick={() => {
          if(!copyOnly){
            setShowImageDetails(true)
          }
        }}
      />
        <button onClick={copyToClipBord} title='Copy URL'
        className='material-symbols-outlined hidden absolute top-2 right-2 text-3xl text-white copyBtn bg-gray-700 p-2 rounded-md'
        >
          content_copy
        </button>
        {
          !copyOnly && user && user._id === image.owner._id &&
          <button  title='Edit Asset' onClick={()=>setShowUpdateAsset(true)}
        className='material-symbols-outlined hidden absolute top-10 scale-50 hover:scale-75 right-2 text-3xl 
         text-white copyBtn bg-gray-700 p-2 rounded-md'
        >
          edit
        </button>
        }
        {
          !copyOnly && user && user._id === image.owner._id &&
          <button  title='Delete Asset' onClick={deleteAsset}
        className='material-symbols-outlined hidden absolute top-[68px] scale-50 hover:scale-75 right-2
         text-3xl bg-gray-700 p-2 rounded-md text-white copyBtn'
        >
          delete
        </button>
        }
      </div>
      {showImageDeatil && !copyOnly &&
      <ShowImageDetails showImageDeatil={showImageDeatil} setShowImageDetails={setShowImageDetails} image={image} />}
      {showUpdateAsset && !copyOnly &&
      <UpdateAsset showUpdateAsset={showUpdateAsset} setShowUpdateAsset={setShowUpdateAsset} asset={image} getPublicAssets={getPublicAssets} />}
    </>
  )
})
