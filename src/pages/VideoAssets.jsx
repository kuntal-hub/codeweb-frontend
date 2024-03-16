import React,{useState,useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateVideoAsset from "../components/assetComponents/CreateVideoAsset";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { assetService } from '../apiServices/asset';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import VideoAssetCard from '../components/assetComponents/VideoAssetCard';

export default function VideoAssets() {
    const [isCreateVideoAssetRendering, setIsCreateVideoAssetRendering] = useState(false);
    const [videos, setVideos] = useState([]);
    const [resData, setResData] = useState(null);
    const [page, setPage] = useState(1);
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    document.title = "codeweb - Video Assets"

    const getPublicAssets = async (page) => {
        const limit = 8;
        if (!urlParams.has('query') || urlParams.get('query').trim() === "") {
            const response = await assetService.getAllPublicAssets({assetType:"video",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                if (page === 1) {
                    setVideos(response.data.docs)
                } else {
                    setVideos([...videos,...response.data.docs])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }else{
            const response = await assetService.searchFromPublicAssets({search:urlParams.get('query'),assetType:"video",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                if (page === 1) {
                    setVideos(response.data.docs)
                } else {
                    setVideos([...videos,...response.data.docs])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
    }

    const search = (data) => {
        const search = data.search.trim().replaceAll(" ","+")
        if (data.search.trim() === "") {
            return navigate(`/assets/videos`)
        }
        navigate(`/assets/videos?query=${search}`)
    }

    useEffect(() => {
        getPublicAssets(1)
    }, [urlParams.get('query')])

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <div className='px-2 md:px-4 flex flex-nowrap justify-between pt-2'>
            <div>
            <form onSubmit={handleSubmit(search)} className='flex flex-nowrap justify-start'>
                    <label
                    className='material-symbols-outlined text-white bg-gray-700 h-10 pt-2 px-3 rounded-l-full cursor-pointer'
                    htmlFor='searchVideoAssets'
                    >search</label>
                    <input 
                    type="search"
                    defaultValue={urlParams.get('query') ? urlParams.get('query') : "" }
                    id='searchVideoAssets'
                    placeholder='Search Images'
                    {...register('search')}
                    className='h-10 py-1 px-3 bg-gray-700 text-white font-semibold rounded-r-full sm:w-96 lg:w-[450px]'
                    />
                </form>
            </div>
            <button onClick={()=>setIsCreateVideoAssetRendering(true)}
            className=' bg-green-600 hover:bg-green-600 font-semibold py-2 px-5 rounded-lg'>
                Create
            </button>
        </div>
        {
            resData ? videos.length > 0 ?
            <InfiniteScroll
            dataLength={videos.length}
            next={()=>getPublicAssets(page+1)}
            height={window.innerHeight-166}
            hasMore={resData.hasNextPage}
            loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
                
                    {
                        videos.map((video,index)=>(
                            <VideoAssetCard key={index} video={video} />
                        ))
                    }
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Videos Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
        }
        {
            isCreateVideoAssetRendering && 
            <CreateVideoAsset 
            setVideos={setVideos} 
            setIsCreateVideoAssetRendering={setIsCreateVideoAssetRendering}
            isCreateVideoAssetRendering={isCreateVideoAssetRendering} />
        }
    </div>
  )
}
