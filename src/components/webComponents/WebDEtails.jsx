import React,{useEffect,useState,useRef,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addNotification } from '../../store/notificationSlice';
import {commentService} from "../../apiServices/comment"
import CommentCard from './CommentCard';
import { Link } from 'react-router-dom';

export default function WebDEtails({web}) {
    const dispatch = useDispatch();
    const createDate = new Date(web.createdAt).toDateString();
    const updateDate = new Date(web.updatedAt).toDateString();
    const [comments,setComments] = useState([])
    const [resData,setResData] = useState(null)
    const [commentInputVal,setCommentInputVal] = useState("")
    const [page,setPage] = useState(1)
    const user = useSelector((state)=>state.auth.userData)
    const textAreaRef = useRef(null);
    const addComment = async()=>{
        const response = await commentService.createComment({web:web._id,text:commentInputVal})
        if (response.status<400 && response.data) {
            response.data.owner = {
                _id:user._id,
                username:user.username,
                fullName:user.fullName,
                avatar:user.avatar
            }
            response.data.replaysCount = 0
            response.data.likesCount = 0
            response.data.isLikedByMe = false
            setComments((prev)=>[response.data,...prev])
            setResData((prev)=>{return {...prev,totalDocs:prev.totalDocs+1}} )
            dispatch(addNotification({type:"success",text:"Comment Added Successfully!"}))
            setCommentInputVal("")
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    const updateTotalCommentSCount = useCallback((value)=>{
        setResData((prev)=>{return {...prev,totalDocs:prev.totalDocs+value}} )
    },[])

    const getComments = async (page)=>{
        const limit = 20;
        const response = await commentService.getAllCommentsByWebId({webId:web._id,page,limit})
        if (response.status<400 && response.data) {
            setResData(response.data)
            if (page === 1) {
                setComments(response.data.docs)
            }else {
                setComments([...comments,...response.data.docs])
            }
            setPage(page)
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

    useEffect(()=>{
        if (user) {
            getComments(1)
        }
    },[])

    const resizeTextArea = () => {
        if (textAreaRef.current === null) return;
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };
    
      useEffect(resizeTextArea, [commentInputVal]);

  return (
    <div className='bg-gray-950 text-white w-full rounded-md pb-2 text-sm'>
        <div className='flex flex-wrap justify-between px-3 pt-3'>
            <div className='w-full md:w-[49%]'>
                <h2 className='text-white font-bold text-lg sm:text-xl'>
                    {web.title}
                </h2>
                <p className='text-gray-300 mt-2 text-[13px]'>
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
                {web.forkedFrom &&
                <>
                <p>
                    Forked From
                </p>
                <div className='flex flex-nowrap justify-start text-blue-400 mt-2'>
                    <img src={web.forkedFrom.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")} 
                    alt="avatar"
                    className='w-10 h-10 rounded-md' />
                    <p className='flex flex-col ml-2 w-[70%]'>
                        <Link className='font-bold text-[16px]'
                        to={`/web/${web.forkedFrom._id}`}>
                        {web.forkedFrom.title}</Link>
                        <Link className='text-[11px]'
                        to={`/${web.forkedFrom.owner.username}`}>
                        {web.forkedFrom.owner.fullName}</Link>
                    </p>
                </div></>}
            </div>
        </div>
        <p className='text-[16px] font-bold text-white w-full px-5 sm:px-8 py-3'>
            {resData? resData.totalDocs : web.commentsCount} Comments
        </p>
        { /* Comment Section */ 
           user ? <>
        <div className='mx-1 sm:mx-5 rounded-md p-2' id='comments'>
            <div className='w-full flex flex-nowrap justify-start'>
            <img src={user.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")} alt="avatar" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col w-[90%] ml-2'>

            <textarea
            ref={textAreaRef}
            value={commentInputVal}
            onChange={(e)=>setCommentInputVal(e.target.value)}
            placeholder='Add a comment...'
            className='text-[12px] border-b-[1px] outline-none bg-gray-950 text-white mb-1 overflow-y-hidden resize-none'
            cols="30" rows="2"></textarea>
            
            <div className='flex flex-nowrap justify-end'>
                <button onClick={addComment} disabled={!commentInputVal.trim()}
                className={`${!commentInputVal.trim() ? "bg-gray-700":"bg-blue-600 hover:bg-blue-500"} text-white px-2 py-1 rounded-full text-[12px]`}
                >Comment</button>
            </div>
            </div>
            </div>
        </div>

        {
            resData ? comments.length > 0 ?
            <InfiniteScroll
            dataLength={comments.length}
            next={()=>getComments(page+1)}
            height={600}
            hasMore={resData.hasNextPage}
            loader={<h4 className='w-full text-center text-[18px] font-bold text-lg'>Loading...</h4>}
            endMessage={
                <p className='w-full text-center text-[18px] font-semibold my-4'>No More Comments</p>
            }
            >
                
                {
                    comments.map((comment,index)=>{
                        return <CommentCard 
                        key={index} 
                        comment={comment} 
                        setComments={setComments} 
                        index={index}
                        updateTotalCommentSCount={updateTotalCommentSCount} />
                    })
                }
    
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white my-14'>😵 No Comments Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white my-14'>Loading...</h1>
        }
            </> :
            <div className='w-full py-10 flex flex-nowrap justify-center'>
                Please &nbsp;
                <Link to="/login" className='text-blue-500 hover:underline font-semibold text-lg'>Login</Link> 
                &nbsp; to comment on this post
            </div>
        }
    </div>
  )
}
