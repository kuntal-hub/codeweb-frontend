import React, { useEffect, useState } from 'react'
import { webService } from '../apiServices/web'
import WebCard from '../components/webComponents/WebCard'
import { useDispatch, useSelector } from 'react-redux'
import { setYourWorkWebs, setYourWorkWebsResData, setYourWorkWebsENV } from "../store/yourWorkSlice"
import { useForm } from "react-hook-form"
import WebLoadingCard from "../components/webComponents/WebLoadingCard"
import InfiniteScroll from 'react-infinite-scroll-component'
import { addNotification } from '../store/notificationSlice'
import { Outlet } from 'react-router-dom'

export default function YourWorkWebs() {
    const dispatch = useDispatch();
    const yourWorkWebs = useSelector(state => state.yourWork.yourWorkWebs)
    const yourWorkWebsResData = useSelector(state => state.yourWork.yourWorkWebsResData)
    const yourWorkWebsENV = useSelector(state => state.yourWork.yourWorkWebsENV)
    const { register, handleSubmit } = useForm();
    const [page, setPage] = useState(1);
    const [isfirst, setIsFirst] = useState(true);
    const user = useSelector(state => state.auth.userData);

    const search = (data)=>{
        dispatch(setYourWorkWebsENV({...yourWorkWebsENV,search:data.search.trim()}));
    }

    const getWebs = async (page) => {
        const limit = 8;
        if (!yourWorkWebsENV.search) {
            const response = await webService.getWebsByUsername({
                username: user.username, 
                page, 
                limit, 
                sortBy: yourWorkWebsENV.sortBy, 
                sortOrder: yourWorkWebsENV.sortOrder, 
                webType: yourWorkWebsENV.view
            });
            if (response.status < 400 && response.data) {
                dispatch(setYourWorkWebsResData(response.data));
                if (page === 1) {
                    dispatch(setYourWorkWebs(response.data.docs));
                } else {
                    dispatch(setYourWorkWebs([...yourWorkWebs, ...response.data.docs]));
                }
                setPage(page);
            } else {
                dispatch(addNotification({ type: "error", text: response.message }))
            }
        } else {
            const response = await webService.searchFromMyWebs({page,limit,search:yourWorkWebsENV.search});
            if (response.status < 400 && response.data) {
                dispatch(setYourWorkWebsResData(response.data));
                if (page === 1) {
                    dispatch(setYourWorkWebs(response.data.docs));
                } else {
                    dispatch(setYourWorkWebs([...yourWorkWebs, ...response.data.docs]));
                }
                setPage(page);
            } else {
                dispatch(addNotification({ type: "error", text: response.message }))
            }
        }
    }

    useEffect(() => {
        setIsFirst(false);
        if (!yourWorkWebsResData) {
            getWebs(1);
        } else {
            setPage(yourWorkWebsResData.page);
        }
    },[])

    useEffect(() => {
        if (!isfirst) {
            dispatch(setYourWorkWebsResData(null));
            getWebs(1);
        }
    },[yourWorkWebsENV])

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
                        defaultValue={yourWorkWebsENV.search}
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
                        disabled={yourWorkWebsENV.search?true:false}
                        value={yourWorkWebsENV.sortBy}
                        onChange={e => dispatch(setYourWorkWebsENV({ ...yourWorkWebsENV, sortBy: e.target.value }))}
                    >
                        <option value="views">Views</option>
                        <option value="createdAt">Date Created</option>
                        <option value="updatedAt">Date Updated</option>
                        <option value="likesCount">Likes Count</option>
                        <option value="commentsCount">Comments Count</option>
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
                        disabled={yourWorkWebsENV.search?true:false}
                        value={yourWorkWebsENV.sortOrder}
                        onChange={e => dispatch(setYourWorkWebsENV({ ...yourWorkWebsENV, sortOrder: e.target.value }))}
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
                        value={yourWorkWebsENV.view}
                        onChange={e => dispatch(setYourWorkWebsENV({ ...yourWorkWebsENV, view: e.target.value,search:"" }))}
                    >
                        <option value="all">All</option>
                        <option value="notForked">ALL (Not Forked)</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="forked">Forked</option>
                    </select>
                </div>

            </div>

            <div className='w-full m-0 p-0 pb-20'>
            {
            yourWorkWebsResData ? yourWorkWebs.length > 0 ?
            <InfiniteScroll
            dataLength={yourWorkWebs.length}
            next={()=>getWebs(page+1)}
            height={window.innerHeight-108}
            hasMore={yourWorkWebsResData.hasNextPage}
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
                        yourWorkWebs.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%] xl:w-[32%]'  
                            key={web._id}>
                                <WebCard web={web} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Result Found</h1> :
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
            </div>
            <Outlet />
        </div>
    )
}
