import React from 'react'
import { collectionService } from '../apiServices/collection'
import { useDispatch, useSelector } from 'react-redux'
import { setPopularCollections, setPopularCollectionsResData } from "../store/profileSlice"
import { addNotification } from '../store/notificationSlice'
import { useEffect, useState } from 'react'
import CollectionCardMain from '../components/CollectionComponents/CollectionCardMain'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import ClollectionLoadingCard from '../components/CollectionComponents/ClollectionLoadingCard'

export default function ProfilepopularCollection() {
    const { username } = useParams()
    const dispatch = useDispatch()
    const popularCollections = useSelector(state => state.profile.popularCollections)
    const popularCollectionResData = useSelector(state => state.profile.popularCollectionResData)
    const [page, setPage] = useState(1)

    const getPopularCollections = async (page) => {
        const limit = 8;
        const response = await collectionService.getCollectionsByUsername({username,page,limit,sortBy:"views"})
        if (response.status < 400 && response.data) {
            dispatch(setPopularCollectionsResData(response.data))
            if (page === 1) {
                dispatch(setPopularCollections(response.data.docs))
            } else {
                dispatch(setPopularCollections([...popularCollections, ...response.data.docs]))
            }
            setPage(page)
        } else {
            dispatch(addNotification({ text: response.message, type: 'error' }))
        }
    }

    useEffect(() => {
        if (!popularCollectionResData) {
            getPopularCollections(1)
        } else {
            setPage(popularCollectionResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
                {
            popularCollectionResData ? popularCollections.length > 0 ?
            <InfiniteScroll
            dataLength={popularCollections.length}
            next={()=>getPopularCollections(page+1)}
            height={window.innerHeight-110}
            hasMore={popularCollectionResData.hasNextPage}
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
                        popularCollections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>{username} Have Not Create Any Collection</h1> :
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
