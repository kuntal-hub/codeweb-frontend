import React, { useEffect, useState } from 'react'
import { authServices } from '../../apiServices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import {setPinedItems,setResData,setIsNewItemAdded} from "../../store/pinedSlice"
import WebCard from "./WebCard"
import InfiniteScroll from 'react-infinite-scroll-component'
import WebLoadingCard from './WebLoadingCard';

export default function PinedItems({ setShowPinedItems, showPinedItems }) {
    const pinedItems = useSelector(state => state.pinedItems.pinedItems);
    const resData = useSelector(state => state.pinedItems.resData);
    const isNewItemAdded = useSelector(state => state.pinedItems.isNewItemAdded);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()

    const handleOutsideClick = (event) => {
        if (showPinedItems && !event.target.closest('.menu-container')) {
            setShowPinedItems(false);
        }
    };

    // Adding event listener for clicks outside menu
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const getPinedItems = async (page)=>{
        const limit = 8;
        const response = await authServices.getPinedItems({page,limit});
        if (response.status<400 && response.data) {
            dispatch(setResData(response.data));
            if (page === 1) {
                dispatch(setPinedItems(response.data.docs));
            } else {
                dispatch(setPinedItems([...pinedItems,...response.data.docs]));
            }
            setPage(page);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(()=>{
        if (isNewItemAdded || !resData) {
            getPinedItems(1);
            dispatch(setIsNewItemAdded(false));
        } else {
            setPage(resData.page);
            dispatch(setIsNewItemAdded(false));
        }
    },[])

    
    return (
        <div className='w-screen h-screen fixed top-0 z-40 left-0 half_transparent pt-16 text-white'>
            <div className='mx-auto h-screen-72 menu-container GB-cointainer p-1 w-[94%] block sm:w-[80%] md:w-[75%] lg:w-[70%]'>
                <div className='h-full w-full bg-gray-950 rounded-md text-white'>
                    <div className='flex flex-nowrap justify-between w-full border-b-[1px] border-b-gray-600'>
                        <h1 className='text-center font-bold text-xl mt-4 border-b-[2px] border-b-green-500 px-3'>
                            Pined Items
                        </h1>
                        <button onClick={() => setShowPinedItems(false)}
                        className='material-symbols-outlined text-white bg-slate-800 rounded-md border m-3 border-white'>
                            close
                        </button>
                    </div>

                    <div className='text-white w-full m-0 p-0 bg-gray-950'>
                {
            resData ? pinedItems.length > 0 ?
            <InfiniteScroll
            dataLength={pinedItems.length}
            next={()=>getPinedItems(page+1)}
            height={window.innerHeight-140}
            hasMore={resData.hasNextPage}
            loader={
                <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
            </div>
            }
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Items</p>
            }
            >
                    <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    {
                        pinedItems.map((web,index)=>{
                            return (
                            <div className='w-[96%] mx-auto lg:w-[48%]'  
                            key={web._id}>
                                <WebCard web={web} addPined={false} />
                            </div>)
                        })
                    }
                    </div>
                
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>No Pined Items Found</h1> :
            <div className='flex flex-wrap justify-start lg:px-3 py-5 xl:px-6'>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
                    <div  className='w-[96%] mx-auto lg:w-[48%]'>
                        <WebLoadingCard />
                    </div>
            </div>
        }
    </div>

                </div>
            </div>
        </div>
    )
}
