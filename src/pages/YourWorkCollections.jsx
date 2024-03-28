import React, { useEffect, useState } from 'react'
import { collectionService } from '../apiServices/collection'
import { useDispatch, useSelector } from 'react-redux'
import { setYourWorkCollections, setYourWorkCollectionsResData, setYourWorkCollectionsENV } from "../store/yourWorkSlice"
import { useForm } from "react-hook-form"
import InfiniteScroll from 'react-infinite-scroll-component'
import { addNotification } from '../store/notificationSlice'
import CollectionCardMain from '../components/CollectionComponents/CollectionCardMain'
import ClollectionLoadingCard from '../components/CollectionComponents/ClollectionLoadingCard'

export default function YourWorkCollections() {
    const dispatch = useDispatch();
    const yourWorkCollections = useSelector(state => state.yourWork.yourWorkCollections)
    const yourWorkCollectionsResData = useSelector(state => state.yourWork.yourWorkCollectionsResData)
    const yourWorkCollectionsENV = useSelector(state => state.yourWork.yourWorkCollectionsENV)
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(1);
    const [isfirst, setIsFirst] = useState(true);
    const user = useSelector(state => state.auth.userData);

    const search = (data)=>{
        dispatch(setYourWorkCollectionsENV({...yourWorkCollectionsENV,search:data.search.trim()}));
    }

    const getCollections = async (page) => {
        const limit = 8;
        if (!yourWorkCollectionsENV.search) {
            const response = await collectionService.getCollectionsCreatedByMe({
                page, 
                limit, 
                sortBy: yourWorkCollectionsENV.sortBy, 
                sortOrder: yourWorkCollectionsENV.sortOrder, 
                type: yourWorkCollectionsENV.view
            });
            if (response.status < 400 && response.data) {
                dispatch(setYourWorkCollectionsResData(response.data));
                // console.log(response.data.docs)
                if (page === 1) {
                    dispatch(setYourWorkCollections(response.data.docs));
                } else {
                    dispatch(setYourWorkCollections([...yourWorkCollections, ...response.data.docs]));
                }
                setPage(page);
            } else {
                dispatch(addNotification({ type: "error", text: response.message }))
            }
        } else {
            const response = await collectionService.searchFromMyCollections({page,limit,search:yourWorkCollectionsENV.search});
            if (response.status < 400 && response.data) {
                dispatch(setYourWorkCollectionsResData(response.data));
                // console.log(response.data.docs)
                if (page === 1) {
                    dispatch(setYourWorkCollections(response.data.docs));
                } else {
                    dispatch(setYourWorkCollections([...yourWorkCollections, ...response.data.docs]));
                }
                setPage(page);
            } else {
                dispatch(addNotification({ type: "error", text: response.message }))
            }
        }
    }

    useEffect(() => {
        setIsFirst(false);
        if (!yourWorkCollectionsResData) {
            getCollections(1)
        } else {
            setPage(yourWorkCollectionsResData.page);
        }
    },[])

    useEffect(() => {
        if (!isfirst) {
            dispatch(setYourWorkCollectionsResData(null));
            getCollections(1);
        }
    },[yourWorkCollectionsENV])

    return (
        <div className='mx-2 md:mx-4'>
            <div className='flex flex-wrap justify-between bg-gray-900 px-2 pb-2'>
                <form className='mr-3 mt-2' onSubmit={handleSubmit(search)} >
                    <label
                        className='text-gray-500 text-[12px] font-semibold mr-2'
                        htmlFor="jhfgvjdhbj">
                        SEARCH
                    </label>
                    <input type="text"
                        className='text-gray-300 text-[12px] font-semibold bg-gray-800 w-[200px] px-2 py-[6px] rounded-l-md border border-gray-700 focus:outline-none border-r-0 '
                        id="jhfgvjdhbj"
                        placeholder='Search Here...'
                        required={true}
                        defaultValue={yourWorkCollectionsENV.search}
                        {...register("search")} />
                    <input type="submit" value="search"
                        className='text-gray-300 text-[12px] font-semibold bg-gray-600 px-2 py-[6px] rounded-r-md border border-gray-700 focus:outline-none border-l-0 hover:bg-gray-700 cursor-pointer'
                    />
                </form>

                <div className='mx-3 mt-2'>
                    <label
                        className='text-gray-500 text-[12px] font-semibold mr-2'
                        htmlFor="jhfgvjdhbjtyhh">
                        SORT BY
                    </label>
                    <select
                        className='text-gray-300 text-[12px] font-semibold bg-gray-800 w-[150px] px-2 py-[6px] rounded-md border border-gray-700 focus:outline-none focus:border-zinc-100'
                        id="jhfgvjdhbjtyhh"
                        disabled={yourWorkCollectionsENV.search?true:false}
                        value={yourWorkCollectionsENV.sortBy}
                        onChange={e => dispatch(setYourWorkCollectionsENV({ ...yourWorkCollectionsENV, sortBy: e.target.value }))}
                    >
                        <option value="views">Views</option>
                        <option value="createdAt">Date Created</option>
                        <option value="updatedAt">Date Updated</option>
                        <option value="likesCount">Likes Count</option>
                    </select>
                </div>

                <div className='mx-3 mt-2'>
                    <label
                        className='text-gray-500 text-[12px] font-semibold mr-2'
                        htmlFor="jhfgvjdhbjtyii">
                        SORT DIRECTION
                    </label>
                    <select
                        className='text-gray-300 text-[12px] font-semibold bg-gray-800 w-[130px] px-2 py-[6px] rounded-md border border-gray-700 focus:outline-none focus:border-zinc-100'
                        id="jhfgvjdhbjtyii"
                        disabled={yourWorkCollectionsENV.search?true:false}
                        value={yourWorkCollectionsENV.sortOrder}
                        onChange={e => dispatch(setYourWorkCollectionsENV({ ...yourWorkCollectionsENV, sortOrder: e.target.value }))}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Acending</option>
                    </select>
                </div>

                <div className='mt-2 ml-3'>
                    <label
                        className='text-gray-500 text-[12px] font-semibold mr-2'
                        htmlFor="jhfgvjdhbjty">
                        VIEW
                    </label>
                    <select
                        className='text-gray-300 text-[12px] font-semibold bg-gray-800 w-[150px] px-2 py-[6px] rounded-md border border-gray-700 focus:outline-none focus:border-zinc-100'
                        id="jhfgvjdhbjty"
                        value={yourWorkCollectionsENV.view}
                        onChange={e => dispatch(setYourWorkCollectionsENV({ ...yourWorkCollectionsENV, view: e.target.value,search:"" }))}
                    >
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

            </div>

            <div className='w-full m-0 p-0 pb-20'>
            {
            yourWorkCollectionsResData ? yourWorkCollections.length > 0 ?
            <InfiniteScroll
            dataLength={yourWorkCollections.length}
            next={()=>getCollections(page+1)}
            height={window.innerHeight-108}
            hasMore={yourWorkCollectionsResData.hasNextPage}
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
                        yourWorkCollections.map((collection,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={collection._id}>
                                <CollectionCardMain collection={collection} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
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

        </div>
    )
}

