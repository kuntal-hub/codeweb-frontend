import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setForkedWebs,setForkedWebsResData } from '../store/profileSlice'
import { webService } from '../apiServices/web'
import { useEffect, useState } from 'react'
import WebCard from '../components/webComponents/WebCard'
import WebLoadingCard from '../components/webComponents/WebLoadingCard'
import { useParams, Outlet } from 'react-router-dom'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProfileForkedWeb() {
    const forkedWebs = useSelector(state => state.profile.forkedWebs)
    const forkedWebResData = useSelector(state => state.profile.forkedWebResData)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const { username } = useParams()

    const getForkedWebs = async (page) => {
        const limit = 10
        const response = await webService.getWebsByUsername({username,webType:"forked",sortBy:"createdAt",page,limit})
        if(response.status < 400 && response.data){
            dispatch(setForkedWebsResData(response.data))
            if (page === 1) {
                dispatch(setForkedWebs(response.data.docs))
            } else {
                dispatch(setForkedWebs([...forkedWebs, ...response.data.docs]))
            
            }
            setPage(page)
        } else {
            dispatch(addNotification({type:'error',text:response.message}))
        }
    }

    useEffect(() => {
        if (!forkedWebResData) {
            getForkedWebs(1)
        } else {
            setPage(forkedWebResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
        {
            forkedWebResData ? forkedWebs.length > 0 ?
            <InfiniteScroll
            dataLength={forkedWebs.length}
            next={()=>getForkedWebs(page+1)}
            height={window.innerHeight-110}
            hasMore={forkedWebResData.hasNextPage}
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
                        forkedWebs.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={web._id}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>{username} Have Not Forked Any Web</h1> :
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
