import React,{useState,useEffect} from 'react'
import { collectionService } from '../apiServices/collection'
import { useDispatch } from 'react-redux'
import { addNotification } from '../store/notificationSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import CollectionCardMain from './CollectionComponents/CollectionCardMain'
import ClollectionLoadingCard from './CollectionComponents/ClollectionLoadingCard'

export default function SearchCollection() {
    const urlParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    const [collections,setCollections] = useState([]);
    const [collectionResData,setCollectionResData] = useState(null);


    const getCollections = async (page)=>{
        const limit = 8;
        const response = await collectionService.searchFromAllCollections({page,limit,search:urlParams.get('q')});
        if (response.status<400 && response.data) {
            setCollectionResData(response.data);
            if (page === 1) {
                setCollections(response.data.docs);
            } else {
                setCollections([...collections,...response.data.docs]);
            }
            setPage(page);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(() => {
        if (urlParams.get('q')) {
            getCollections(1);
        } else {
            setCollections([]);
        }
    },[urlParams.get('q')]);

  return (
    <div className='text-white w-full m-0 p-0 bg-gray-950'>
                    {
            collectionResData ? collections.length > 0 ?
            <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={collections.length}
            next={()=>getCollections(page+1)}
            height={window.innerHeight-108}
            hasMore={collectionResData.hasNextPage}
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
                        collections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found!</h1> :
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
