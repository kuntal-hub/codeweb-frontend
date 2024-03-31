import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPrivateWebs,setPrivateWebsResData } from '../store/profileSlice'
import { webService } from '../apiServices/web'
import { useEffect, useState } from 'react'
import WebCard from '../components/webComponents/WebCard'
import WebLoadingCard from '../components/webComponents/WebLoadingCard'
import { useParams, Outlet, useNavigate } from 'react-router-dom'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProfilePrivateWeb() {
    const privateWebs = useSelector(state => state.profile.privateWebs)
    const privateWebResData = useSelector(state => state.profile.privateWebResData)
    const user = useSelector(state => state.auth.userData)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const { username } = useParams()
    const navigate = useNavigate()

    const getPrivateWebs = async (page) => {
        const limit = 10
        const response = await webService.getWebsByUsername({username,webType:"private",sortBy:"createdAt",page,limit})
        if(response.status < 400 && response.data){
            dispatch(setPrivateWebsResData(response.data))
            if (page === 1) {
                dispatch(setPrivateWebs(response.data.docs))
            } else {
                dispatch(setPrivateWebs([...privateWebs, ...response.data.docs]))
            
            }
            setPage(page)
        } else {
            dispatch(addNotification({type:'error',text:response.message}))
        }
    }

    useEffect(() => {
        if (user.username !== username) {
          return navigate(`/${username}/public`, { replace: true });
        }
        if (!privateWebResData) {
            getPrivateWebs(1)
        } else {
            setPage(privateWebResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
        {
            privateWebResData ? privateWebs.length > 0 ?
            <InfiniteScroll
            dataLength={privateWebs.length}
            next={()=>getPrivateWebs(page+1)}
            height={window.innerHeight-110}
            hasMore={privateWebResData.hasNextPage}
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
                        privateWebs.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={web._id}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>{username} Have Not Create Any Private Web</h1> :
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
