import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../store/notificationSlice'
import { setTrendings, setTrendingResData } from '../store/trendingSlice'
import { webService } from '../apiServices/web'
import InfiniteScroll from 'react-infinite-scroll-component'
import WebCard from '../components/webComponents/WebCard'
import WebLoadingCard from '../components/webComponents/WebLoadingCard'

export default function Trending() {
    const dispatch = useDispatch();
    const trendings = useSelector(state => state.trending.trendings);
    const trendingResData = useSelector(state => state.trending.trendingResData);
    const [page,setPage] = useState(1);

    const getTrendingWebs = async (page)=>{
        const limit = 8;
        const response = await webService.getTrendingWebs({page,limit});
        if (response.status<400 && response.data) {
            dispatch(setTrendingResData(response.data));
            if (page === 1) {
                dispatch(setTrendings(response.data.docs));
            } else {
                dispatch(setTrendings([...trendings,...response.data.docs]));
            }
            setPage(page);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(() => {
        if (!trendingResData) {
            getTrendingWebs(1);
        } else {
            setPage(trendingResData.page);
        }
    },[]);

  return (
    <div className='text-white w-full m-0 p-0 bg-gray-950'>
                {
            trendingResData ? trendings.length > 0 ?
            <InfiniteScroll
            dataLength={trendings.length}
            next={()=>getTrendingWebs(page+1)}
            height={window.innerHeight-110}
            hasMore={trendingResData.hasNextPage}
            loader={
                <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
            </div>
            }
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
                    <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    {
                        trendings.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%]'  
                            key={index}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
                <WebLoadingCard />
            </div>
        }
    </div>
  )
}
