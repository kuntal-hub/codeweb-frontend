import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPublicWebs,setPublicWebsResData } from '../store/profileSlice'
import { webService } from '../apiServices/web'
import { useEffect, useState } from 'react'
import WebCard from '../components/webComponents/WebCard'
import WebLoadingCard from '../components/webComponents/WebLoadingCard'
import { useParams, Outlet } from 'react-router-dom'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProfilePublicWebs() {
    const publicWebs = useSelector(state => state.profile.publicWebs)
    const publicWebresData = useSelector(state => state.profile.publicWebresData)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const { username } = useParams()

    const getPublicWebs = async (page) => {
        const limit = 10
        const response = await webService.getWebsByUsername({username,webType:"public",sortBy:"createdAt",page,limit})
        if(response.status < 400 && response.data){
            dispatch(setPublicWebsResData(response.data))
            if (page === 1) {
                dispatch(setPublicWebs(response.data.docs))
            } else {
                dispatch(setPublicWebs([...publicWebs, ...response.data.docs]))
            
            }
            setPage(page)
        } else {
            dispatch(addNotification({type:'error',text:response.message}))
        }
    }

    useEffect(() => {
        if (!publicWebresData) {
            getPublicWebs(1)
        } else {
            setPage(publicWebresData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
        {
            publicWebresData ? publicWebs.length > 0 ?
            <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={publicWebs.length}
            next={()=>getPublicWebs(page+1)}
            height={window.innerHeight-110}
            hasMore={publicWebresData.hasNextPage}
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
                        publicWebs.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={web._id}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-20'>{username} Have Not Create Any Public Web</h1> :
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
