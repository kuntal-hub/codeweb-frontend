import React from 'react'
import { collectionService } from '../apiServices/collection'
import { useDispatch, useSelector } from 'react-redux'
import { setLikedCollections, setLikedCollectionsResData } from "../store/profileSlice"
import { addNotification } from '../store/notificationSlice'
import { useEffect, useState } from 'react'
import CollectionCardMain from '../components/CollectionComponents/CollectionCardMain'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import ClollectionLoadingCard from '../components/CollectionComponents/ClollectionLoadingCard'

export default function ProfileLikedColection() {
    const { username } = useParams()
    const dispatch = useDispatch()
    const likedCollections = useSelector(state => state.profile.likedCollections)
    const likedCollectionResData = useSelector(state => state.profile.likedCollectionResData)
    const [page, setPage] = useState(1)

    const getlikedCollections = async (page) => {
        const limit = 8;
        const response = await collectionService.getLikedCollectionsByUsername({username,page,limit})
        if (response.status < 400 && response.data) {
            dispatch(setLikedCollectionsResData(response.data))
            if (page === 1) {
                dispatch(setLikedCollections(response.data.docs))
            } else {
                dispatch(setLikedCollections([...likedCollections, ...response.data.docs]))
            }
            setPage(page)
        } else {
            dispatch(addNotification({ text: response.message, type: 'error' }))
        }
    }

    useEffect(() => {
        if (!likedCollectionResData) {
            getlikedCollections(1)
        } else {
            setPage(likedCollectionResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
                {
            likedCollectionResData ? likedCollections.length > 0 ?
            <InfiniteScroll
            dataLength={likedCollections.length}
            next={()=>getlikedCollections(page+1)}
            height={window.innerHeight-110}
            hasMore={likedCollectionResData.hasNextPage}
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
                        likedCollections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-20'>{username} Have Not Liked Any Collection</h1> :
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
