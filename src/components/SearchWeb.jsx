import React,{useState,useEffect} from 'react'
import { webService } from "../apiServices/web"
import { useDispatch } from 'react-redux'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import WebCard from './webComponents/WebCard'
import WebLoadingCard from './webComponents/WebLoadingCard'
import { Outlet } from 'react-router-dom'

export default function SearchWeb() {
    const urlParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    const [webs,setWebs] = useState([]);
    const [webResData,setWebResData] = useState(null);

    const getWebs = async (page)=>{
        const limit = 8;
        const response = await webService.searchFromAllWebs({page,limit,search:urlParams.get('q')});
        if (response.status<400 && response.data) {
            setWebResData(response.data);
            if (page === 1) {
                setWebs(response.data.docs);
            } else {
                setWebs([...webs,...response.data.docs]);
            }
            setPage(page);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(() => {
        if (urlParams.get('q')) {
            getWebs(1);
        } else {
            setWebs([]);
        }
    },[urlParams.get('q')]);

  return (
        <div className='text-white w-full m-0 p-0 bg-gray-950'>
                {
            webResData ? webs.length > 0 ?
            <InfiniteScroll
            dataLength={webs.length}
            next={()=>getWebs(page+1)}
            height={window.innerHeight-110}
            hasMore={webResData.hasNextPage}
            loader={
                <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <WebLoadingCard />
                </div>
          </div>
            }
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
                    <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    {
                        webs.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={web._id}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <WebLoadingCard />
            </div>
      </div>
        }
        <Outlet />
    </div>
  )
}
