import React,{useState,useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateImageAsset from '../components/assetComponents/CreateImageAsset';
import { assetService } from '../apiServices/asset';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import ImageAssetCard from '../components/assetComponents/ImageAssetCard';

export default function ImageAssets() {
    const [isShowAll, setIsShowAll] = useState(true)
    const [images, setImages] = useState([])
    const [resData, setResData] = useState(null)
    const [isCreateImageAssetRendering, setIsCreateImageAssetRendering] = useState(false)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    const getPublicAssets = async (page) => {
        const response = await assetService.getAllPublicAssets({assetType:"image",page:page,limit:20})
        if (response.status < 400 && response.data) {
            setResData(response.data)
            setImages(response.data.docs)
            setPage(page)
        } else{
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    const getMyAssets = async (page) => {
        const response = await assetService.getMyAssets({assetType:"image",page:page,limit:20})
        if (response.status < 400 && response.data) {
            setResData(response.data)
            setImages(response.data.docs)
            setPage(page)
        } else{
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(() => {
        if (isShowAll) {
            getPublicAssets(1)
        }
    }, [])

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <div className='px-2 md:px-4 flex flex-nowrap justify-between py-2'>
            <div>
                <button onClick={()=>{
                    setIsShowAll(true)
                    getPublicAssets(1)
                }}
                disabled={isShowAll}
                className={`text-white font-semibold py-[2px] px-3 text-[14px] rounded-lg hover:bg-gray-700 
                ${isShowAll? "bg-gray-700 border":"bg-gray-600"}`}>
                    All
                </button>
                <button onClick={()=>{
                    setIsShowAll(false)
                    getMyAssets(1)
                }}
                disabled={!isShowAll}
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

        {
            resData && 
            <InfiniteScroll
            dataLength={images.length}
            next={()=>{
                if (isShowAll) {
                    getPublicAssets(page+1)
                } else {
                    getMyAssets(page+1)
                }
            
            }}
            height={window.innerHeight-166}
            hasMore={resData.hasNextPage}
            loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
              <div className='flex flex-wrap justify-start px-4 pb-2 w-full'>
                  {
                        images.map((image,index)=>(
                            <ImageAssetCard key={index} image={image} />
                        ))
                  }
              </div>
            </InfiniteScroll>
        }

        {isCreateImageAssetRendering && <CreateImageAsset 
        isCreateImageAssetRendering={isCreateImageAssetRendering}
        setIsCreateImageAssetRendering={setIsCreateImageAssetRendering}
        setImages={setImages} />}
    </div>
  )
}
