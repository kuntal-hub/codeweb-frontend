import React,{useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateImageAsset from '../components/assetComponents/CreateImageAsset';

export default function ImageAssets() {
    const [isShowAll, setIsShowAll] = useState(true)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateImageAssetRendering, setIsCreateImageAssetRendering] = useState(false)

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <div className='px-2 md:px-4 flex flex-nowrap justify-between pt-2'>
            <div>
                <button onClick={()=>setIsShowAll(true)}
                className={`text-white font-semibold py-[2px] px-3 text-[14px] rounded-lg hover:bg-gray-700 
                ${isShowAll? "bg-gray-700 border":"bg-gray-600"}`}>
                    All
                </button>
                <button onClick={()=>setIsShowAll(false)}
                className={`text-white font-semibold py-[2px] px-3 text-[14px] rounded-lg ml-3 hover:bg-gray-700 
                ${!isShowAll? "bg-gray-700 border":"bg-gray-600"}`}>
                    My
                </button>
            </div>
            <button onClick={()=>setIsCreateImageAssetRendering(true)}
            className=' bg-green-600 hover:bg-green-600 font-semibold py-2 px-5 rounded-lg'>
                Create
            </button>
        </div>

        {isCreateImageAssetRendering && <CreateImageAsset 
        isCreateImageAssetRendering={isCreateImageAssetRendering}
        setIsCreateImageAssetRendering={setIsCreateImageAssetRendering}
        setImages={setImages} />}
    </div>
  )
}
