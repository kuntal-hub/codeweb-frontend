import React, { useState, memo, useRef, useEffect, useCallback } from 'react'
import { commentService } from '../../apiServices/comment'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { replySearvice } from "../../apiServices/reply"
import { likeSearvice } from '../../apiServices/like'
import { Link } from 'react-router-dom'
import ReplyCard from './ReplyCard'

export default memo(function CommentCard({ comment, setComments, index }) {
    const [commentInputVal, setCommentInputVal] = useState("")
    const [replyInputVal, setReplyInputVal] = useState(`@${comment.owner.username} `)
    const [readOnly, setReadOnly] = useState(true)
    const [showCreateReply, setShowCreateReply] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.userData)
    const [replies, setReplies] = useState([])
    const [resData, setResData] = useState(null)
    const [page, setPage] = useState(1)
    const [showReplies, setShowReplies] = useState(false)
    const textAreaRef = useRef(null);
    const replyTextAreaRef = useRef(null);

    const deleteComment = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this comment?")
        if (!confirmation) return
        const response = await commentService.deleteComment({ commentId: comment._id })
        if (response.status < 400 && response.data) {
            setComments((prev) => prev.filter((c, i) => i !== index))
            dispatch(addNotification({ type: "success", text: response.message }))
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const createReply = async () => {
        if (!replyInputVal.trim()) return
        const response = await replySearvice.createReply({ commentId: comment._id, text: replyInputVal })
        if (response.status < 400 && response.data) {
            response.data.owner = {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                avatar: user.avatar
            }
            response.data.likesCount = 0
            response.data.isLikedByMe = false
            setComments((prev) => prev.map((c, i) => i === index ? { ...c, replaysCount: c.replaysCount + 1 } : c))
            setReplies((prev) => [response.data, ...prev])
            setShowCreateReply(false)
            setReplyInputVal(`@${comment.owner.username} `)
            dispatch(addNotification({ type: "success", text: response.message }))
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const getReplies = async (page) => {
        const limit = 15;
        setResData(null)
        const response = await replySearvice.getAllReplies({ commentId: comment._id, page, limit })
        if (response.status < 400 && response.data) {
            setResData(response.data)
            if (page === 1) {
                setReplies(response.data.docs)
            } else {
                setReplies([...replies, ...response.data.docs])
            }
            setPage(page)
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const updateComment = async () => {
        if (!commentInputVal.trim()) return
        if (commentInputVal.trim() === comment.text) {
            setReadOnly(true)
            return
        }
        const response = await commentService.updateComment({ commentId: comment._id, text: commentInputVal })
        if (response.status < 400 && response.data) {
            response.data.owner = {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                avatar: user.avatar
            }
            response.data.replaysCount = comment.replaysCount;
            response.data.likesCount = comment.likesCount;
            response.data.isLikedByMe = comment.isLikedByMe;
            setReadOnly(true)
            setComments((prev) => prev.map((c, i) => i === index ? response.data : c))
            dispatch(addNotification({ type: "success", text: response.message }))
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const toggleLike = async () => {
        const isLiked = comment.isLikedByMe;
        setComments((prev) => prev.map((c, i) => i === index ? { ...c, likesCount: isLiked ? c.likesCount - 1 : c.likesCount + 1, isLikedByMe: !isLiked } : c))
        const response = await likeSearvice.toggleLikeComment({ commentId: comment._id });
        if (response.status >= 400) {
            dispatch(addNotification({ type: "error", text: response.message }))
            setComments((prev) => prev.map((c, i) => i === index ? { ...c, likesCount: isLiked ? c.likesCount + 1 : c.likesCount - 1, isLikedByMe: !isLiked } : c))
        }
    }

    const showReplyCreateForm = useCallback((username) => {
        setShowCreateReply(true)
        if (!readOnly) {
            setReadOnly(true)
        }
        setReplyInputVal(`@${username} `)
    },[readOnly,showCreateReply])

    const resizeTextAreaForEditComment = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    const resizeTextAreaForReply = () => {
        if (!showCreateReply) return;
        replyTextAreaRef.current.style.height = "auto";
        replyTextAreaRef.current.style.height = replyTextAreaRef.current.scrollHeight + "px";
    }

    useEffect(resizeTextAreaForEditComment, [commentInputVal]);
    useEffect(resizeTextAreaForReply, [replyInputVal]);

    return (
        <div className='my-5 mx-2'>
            <div className='mx-1 sm:mx-5 rounded-md'>
                <div className='w-full flex flex-nowrap justify-start'>
                    <img src={comment.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_40/")} alt="avatar" className='w-10 h-10 rounded-full' />
                    <div className='flex flex-col w-[90%] ml-2'>
                        {
                            readOnly && <Link to={`/${comment.owner.username}`}
                                className='text-[10px] text-gray-400'>@{comment.owner.username}</Link>
                        }

                        <textarea
                            value={commentInputVal ? commentInputVal : comment.text}
                            readOnly={readOnly}
                            ref={textAreaRef}
                            onChange={(e) => setCommentInputVal(e.target.value)}
                            placeholder='Add a comment...'
                            className={`${readOnly ? "text-[14px]" : "text-[12px] border-b-[1px]"} 
                             outline-none bg-gray-950 text-white mb-1 overflow-y-hidden resize-none`}
                            cols="30" rows="1"
                        ></textarea>

                        {!readOnly &&
                            <div className='flex flex-nowrap justify-end'>
                                <button onClick={() => setReadOnly(true)}
                                    className='py-1 px-2 rounded-full text-[12px] text-white border bg-gray-800 mr-1'>
                                    Cancel
                                </button>
                                <button disabled={!commentInputVal.trim()} onClick={updateComment}
                                    className={`${!commentInputVal.trim() ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-500"} text-white px-2 py-1 rounded-full text-[12px]`}
                                >Save</button>
                            </div>}

                    </div>
                    {
                        user && user._id === comment.owner._id && readOnly &&
                        <div className='flex flex-col justify-center hoverableEle'>
                            <button className='material-symbols-outlined'>more_vert</button>
                            <div className='showingEle right-6 rounded-md bg-gray-700'>
                                <button onClick={() => setReadOnly(false)}
                                    className='flex flix-nowrap justify-center text-[10px] font-semibold py-1 px-3 text-white hover:bg-gray-600 rounded-t-md w-full'>
                                    <span className="material-symbols-outlined">edit</span>
                                    Edit
                                </button>
                                <button onClick={deleteComment}
                                    className='flex flix-nowrap justify-center text-[10px] font-semibold py-1 px-3 text-white hover:bg-gray-600 rounded-b-md'>
                                    <span className="material-symbols-outlined">delete</span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    }
                </div>

            </div>


            <div className='ml-10 sm:ml-14 rounded-md px-2 text-white'>
                <div className='flex flex-nowrap justify-start'>
                    <button onClick={toggleLike}
                        title={comment.isLikedByMe ? "Unlike" : "Like"}
                        className='mt-1'
                    >
                        {
                            comment.isLikedByMe ?
                                <img alt='like'
                                    className='w-6 m-0 h-6 hover:scale-125 transition-transform
                                     duration-300 ease-in-out'
                                    src='https://res.cloudinary.com/dvrpvl53d/image/upload/v1709992461/8294893_n5a1la.png' />
                                : <span
                                    className='material-symbols-outlined hover:scale-125 transition-transform duration-300 ease-in-out'>
                                    favorite
                                </span>
                        }
                    </button>
                    <span className='ml-1 block mt-1'>
                        {comment.likesCount}
                    </span>

                    <button onClick={() => {
                        setShowCreateReply(!showCreateReply)
                        if (!readOnly) {
                            setReadOnly(true)
                        }
                    }}
                        className='flex bg-gray-800 hover:bg-gray-700 ml-5 flex-nowrap justify-start text-[12px] border rounded-full mt-1 h-6 py-[2px] px-2'>
                        Reply
                    </button>
                </div>


                {
                    showCreateReply && readOnly &&
                    <div className='w-full flex flex-nowrap justify-start mt-3'>
                        <img src={user.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_28/")} alt="avatar" className='w-7 h-7 rounded-full' />
                        <div className='flex flex-col w-[90%] ml-2'>
                            <textarea
                                value={replyInputVal}
                                ref={replyTextAreaRef}
                                onChange={(e) => setReplyInputVal(e.target.value)}
                                placeholder='Add a Reply...'
                                className={`text-[12px] border-b-[1px] outline-none bg-gray-950 text-white mb-1 overflow-y-hidden resize-none`}
                                cols="30" rows="1"
                            ></textarea>


                            <div className='flex flex-nowrap justify-end'>
                                <button onClick={() => setShowCreateReply(false)}
                                    className='py-1 px-2 rounded-full text-[12px] text-white border bg-gray-800 mr-1'>
                                    Cancel
                                </button>
                                <button disabled={!replyInputVal.trim()} onClick={createReply}
                                    className={`${!replyInputVal.trim() ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-500"} text-white px-2 py-1 rounded-full text-[12px]`}
                                >
                                    Reply
                                </button>
                            </div>

                        </div>

                    </div>
                }

                <div>
                    <button onClick={() => {
                        setShowReplies(!showReplies);
                        if (!resData) {
                            getReplies(1);
                        }
                    }}>
                        <span className='text-[12px] text-blue-600 font-semibold hover:underline'>
                            {comment.replaysCount} Replies
                        </span>
                    </button>
                </div>

                {showReplies &&
                    <div className='mt-3'>
                        {resData ? replies.length > 0 ?
                            <div>
                                {
                                    replies.map((reply, index) => {
                                        return (
                                            <ReplyCard 
                                            key={index} 
                                            reply={reply} 
                                            setReplies={setReplies} 
                                            index={index}
                                            showReplyCreateForm={showReplyCreateForm} />
                                        )
                                    })
                                }
                                {
                                    resData.hasNextPage &&
                                    <button onClick={() => getReplies(page + 1)}
                                        className='text-[12px] text-blue-600 font-semibold hover:underline'>
                                        Load More
                                    </button>
                                }
                            </div> :
                            <h1 className='text-center font-bold text-lg text-white my-2'>0 Replies Found</h1> :
                            <h1 className='text-center font-bold text-lg text-white my-6'>Loading...</h1>
                        }
                    </div>}
            </div>
        </div>
    )
})