import React from 'react'
import { collectionService } from '../apiServices/collection'
import { useDispatch, useSelector } from 'react-redux'
import { setPrivateCollections, setPrivateCollectionsResData } from "../store/profileSlice"
import { addNotification } from '../store/notificationSlice'
import { useEffect, useState } from 'react'
import CollectionCardMain from '../components/CollectionComponents/CollectionCardMain'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams,useNavigate } from 'react-router-dom'
import ClollectionLoadingCard from '../components/CollectionComponents/ClollectionLoadingCard'

export default function ProfilePrivateCollections() {
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const privateCollections = useSelector(state => state.profile.privateCollections)
    const privateCollectionResData = useSelector(state => state.profile.privateCollectionResData)
    const [page, setPage] = useState(1)
    const user = useSelector(state => state.auth.userData)

    const getPrivateCollections = async (page) => {
        const limit = 8;
        const response = await collectionService.getCollectionsCreatedByMe({type:"private",page,limit,sortBy:"createdAt"})
        if (response.status < 400 && response.data) {
            dispatch(setPrivateCollectionsResData(response.data))
            if (page === 1) {
                dispatch(setPrivateCollections(response.data.docs))
            } else {
                dispatch(setPrivateCollections([...privateCollections, ...response.data.docs]))
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
        if (!privateCollectionResData) {
            getPrivateCollections(1)
        } else {
            setPage(privateCollectionResData.page)
        }
    }, [username])

  return (
    <div className='w-full m-0 p-0'>
                {
            privateCollectionResData ? privateCollections.length > 0 ?
            <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={privateCollections.length}
            next={()=>getPrivateCollections(page+1)}
            height={window.innerHeight-110}
            hasMore={privateCollectionResData.hasNextPage}
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
                        privateCollections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-20'>You Have Not Create Any Private Collection</h1> :
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
