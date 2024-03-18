import React,{useState,useEffect} from 'react'
import { assetService } from '../../apiServices/asset';
import ShowMyVideoAssets from '../assetComponents/ShowMyVideoAssets';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import "../../cssFiles/assetCards.css";

export default function Videos() {
    const [videos, setVideos] = useState([]);
    const [videoCurrentPage, setVideoCurrentPage] = useState(1);
    const [videoResData, setVideosResData] = useState(null);
    const dispatch = useDispatch();

    const getVideoAssets = async (page) => {
        const limit = 8;
        const response = await assetService.getAllPublicAssets({ assetType: "video", page: page, limit })
        if (response.status < 400 && response.data) {
          setVideosResData(response.data)
          if (page === 1) {
            setVideos(response.data.docs)
          } else {
            setVideos([...videos, ...response.data.docs])
          }
          setVideoCurrentPage(page)
        } else {
          dispatch(addNotification({ type: "error", text: response.message }))
        }
      }

        useEffect(() => {
            getVideoAssets(1)
        }, [])

  return (
    <div className='w-full h-full-50px rounded-b-lg px-1'>
        <ShowMyVideoAssets
            videos={videos}
            videoCurrentPage={videoCurrentPage}
            videoResData={videoResData}
            getVideoAssets={getVideoAssets}
            height={window.innerHeight - 112}
        />
    </div>
  )
}
