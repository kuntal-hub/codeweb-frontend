import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { useForm } from "react-hook-form"
import {commentService} from "../../apiServices/comment"
import {replySearvice} from "../../apiServices/reply"

export default function WebDEtails({web}) {
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm()
    const createDate = new Date(web.createdAt).toDateString();
    const updateDate = new Date(web.updatedAt).toDateString();

    const addComment = async(data)=>{
        const response = await commentService.createComment({web:web._id,text:data.text})
        if (response.status<400 && response.data) {
            dispatch(addNotification({type:"success",text:"Comment Added Successfully!"}))
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(()=>{
        commentService.getAllCommentsByWebId({webId:web._id,page:1,limit:20})
        .then((response)=>console.log(response))
    },[])

  return (
    <div className='bg-gray-950 text-white w-full rounded-md pb-2'>
        <div className='flex flex-wrap justify-between px-3 pt-3'>
            <div className='w-full md:w-[49%]'>
                <h2 className='text-white font-bold text-lg sm:text-xl lg:text-2xl'>
                    {web.title}
                </h2>
                <p className='text-gray-300 mt-2 font-medium text-[14px]'>
                    {web.description}
                </p>
            </div>
            <div className='w-full md:w-[49%] my-3'>
                <button onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    dispatch(addNotification({type:"success",text:"Link Copied"}))
                }}
                className='flex flex-nowrap justify-center bg-gray-700 hover:bg-gray-600 rounded-md py-1 px-3 mx-auto'>
                    <span className="material-symbols-outlined">link</span>
                    <span className=' hover:underline text-[14px] ml-1 font-medium'>Copy Link</span>
                </button>
                <div className='w-full flex flex-nowrap justify-between p-3'>
                    <div className='w-[49%] flex flex-col'>
                        <span className=' font-medium text-[15px]'>Created At</span>
                        <span className='text-[13px] text-gray-400 font-medium'>{createDate}</span>
                    </div>
                    <div className='w-[49%] flex flex-col'>
                        <span className=' font-medium text-[15px]'>Updated At</span>
                        <span className='text-[13px] text-gray-400 font-medium'>{updateDate}</span>
                    </div>
                </div>
                <p className='w-full flex flex-nowrap justify-center py-3'>
                    <span className="material-symbols-outlined">favorite</span>
                    <span className='font-medium ml-2'>{web.likesCount} Loves</span>
                </p>
                <p className='w-full flex flex-nowrap justify-center py-3'>
                    <span className="material-symbols-outlined">visibility</span>
                    <span className='font-medium ml-2'>{web.views} Views</span>
                </p>
            </div>
        </div>
        <div className='mx-1 sm:mx-2 rounded-md bg-gray-700 p-2'>
            <form onSubmit={handleSubmit(addComment)}
            className='flex flex-nowrap w-full justify-center px-2 sm:px-4'
            >
                <input type="text"
                required={true}
                placeholder='Add a Comment Hear...'
                className='w-[90%] rounded-l-full py-2 pl-4 bg-gray-200 text-black'
                {...register("text")}
                />
                <button
                type='submit'
                className='material-symbols-outlined text-black rounded-r-full py-2 px-3 bg-gray-200 ml-[1px]'
                >
                    send
                </button>
            </form>
        </div>
    </div>
  )
}
