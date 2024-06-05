import React from 'react'
import { savedCollectionService } from '../apiServices/savedCollection'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedCollections, setSavedCollectionsResData } from "../store/profileSlice"
import { addNotification } from '../store/notificationSlice'
import { useEffect, useState } from 'react'
import CollectionCardMain from '../components/CollectionComponents/CollectionCardMain'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams,useNavigate } from 'react-router-dom'
import ClollectionLoadingCard from '../components/CollectionComponents/ClollectionLoadingCard'

export default function ProfileSavedCollection() {
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const savedCollections = useSelector(state => state.profile.savedCollections)
    const savedCollectionResData = useSelector(state => state.profile.savedCollectionResData)
    const user = useSelector(state => state.auth.userData)
    const [page, setPage] = useState(1)

    const getsavedCollections = async (page) => {
        const limit = 8;
        const response = await savedCollectionService.getSavedCollections({page,limit})
        if (response.status < 400 && response.data) {
            dispatch(setSavedCollectionsResData(response.data))
            if (page === 1) {
                dispatch(setSavedCollections(response.data.docs))
            } else {
                dispatch(setSavedCollections([...savedCollections, ...response.data.docs]))
            }
            setPage(page)
        } else {
            dispatch(addNotification({ text: response.message, type: 'error' }))
        }
    }

    useEffect(() => {
        if (!user || user.username !== username) {
            return navigate(`/${username}/collections/popular`, { replace: true });
        }
        if (!savedCollectionResData) {
            getsavedCollections(1)
        } else {
            setPage(savedCollectionResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
                {
            savedCollectionResData ? savedCollections.length > 0 ?
            <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={savedCollections.length}
            next={()=>getsavedCollections(page+1)}
            height={window.innerHeight-110}
            hasMore={savedCollectionResData.hasNextPage}
            loader={
                <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
                <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
                  <ClollectionLoadingCard />
                </div>
          </div>
            }
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
                    <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    {
                        savedCollections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-20'>{username} Have Not Save Any Collection</h1> :
            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'>
              <ClollectionLoadingCard />
            </div>
      </div>
        }
    </div>
  )
}