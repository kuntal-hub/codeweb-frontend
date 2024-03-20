import React, { useState, memo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { likeSearvice } from '../../apiServices/like'
import { Link } from 'react-router-dom'
import { replySearvice } from '../../apiServices/reply'

export default memo(function ReplyCard({ reply, setReplies, index, showReplyCreateForm }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.userData)
    const textAreaRef = useRef(null)
    const [replyInputVal, setReplyInputVal] = useState('')
    const [readOnly, setReadOnly] = useState(true)


    const deleteReply = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this reply?")
        if (!confirmation) return
        const response = await replySearvice.deleteReply({ replyId: reply._id })
        if (response.status < 400 && response.data) {
            setReplies((prev) => prev.filter((r, i) => i !== index))
            dispatch(addNotification({ type: "success", text: "Reply Deleted Successfully!" }))
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const udateReply = async () => {
        const response = await replySearvice.updateReply({ replyId: reply._id, text: replyInputVal })
        if (response.status < 400 && response.data) {
            response.data.owner = {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                avatar: user.avatar
            }
            response.data.likesCount = 0
            response.data.isLikedByMe = false
            setReplies((prev) => prev.map((r, i) => i === index ? response.data : r))
            dispatch(addNotification({ type: "success", text: "Reply Updated Successfully!" }))
            setReadOnly(true)
        } else {
            dispatch(addNotification({ type: "error", text: response.message }))
        }
    }

    const toggleLike = async () => {
        const isLiked = reply.isLikedByMe;
        setReplies((prev) => prev.map((r, i) => i === index ? { ...r, isLikedByMe: !isLiked, likesCount: isLiked ? r.likesCount - 1 : r.likesCount + 1 } : r))
        await likeSearvice.toggleLikeReply({ replyId: reply._id })
    }

    const resizeTextAreaForEditComment = () => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    };

    useEffect(resizeTextAreaForEditComment, [replyInputVal]);


    return (
        <div className='sm:pr-3 my-5'>
            <div className='w-full flex flex-nowrap justify-start'>
                <img src={reply.owner.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_28/")} alt="avatar" className='w-7 h-7 rounded-full' />
                <div className='flex flex-col w-[90%] ml-2'>
                    {
                        readOnly && <Link to={`/${reply.owner.username}`}
                            className='text-[10px] text-gray-400'>@{reply.owner.username}</Link>
                    }

                    <textarea
                        value={replyInputVal ? replyInputVal : reply.text}
                        readOnly={readOnly}
                        ref={textAreaRef}
                        onChange={(e) => setReplyInputVal(e.target.value)}
                        placeholder='Add a reply...'
                        className={`${readOnly ? "" : "border-b-[1px]"} text-[12px] 
                             outline-none bg-gray-950 text-white mb-1 overflow-y-hidden resize-none`}
                        cols="30" rows="1"
                    ></textarea>

                    {!readOnly &&
                        <div className='flex flex-nowrap justify-end'>
                            <button onClick={() => setReadOnly(true)}
                                className='py-1 px-2 rounded-full text-[12px] text-white border bg-gray-800 mr-1'>
                                Cancel
                            </button>
                            <button disabled={!replyInputVal.trim()} onClick={udateReply}
                                className={`${!replyInputVal.trim() ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-500"} text-white px-2 py-1 rounded-full text-[12px]`}
                            >Save</button>
                        </div>}

                </div>
                {
                    user && user._id === reply.owner._id && readOnly &&
                    <div className='flex flex-col justify-center hoverableEle'>
                        <button className='material-symbols-outlined scale-75'>more_vert</button>
                        <div className='showingEle right-6 rounded-md bg-gray-700'>
                            <button onClick={() => setReadOnly(false)}
                                className='flex flix-nowrap justify-center text-[10px] font-semibold py-1 px-3 text-white hover:bg-gray-600 rounded-t-md w-full'>
                                <span className="material-symbols-outlined scale-75">edit</span>
                                Edit
                            </button>
                            <button onClick={deleteReply}
                                className='flex flix-nowrap justify-center text-[10px] font-semibold py-1 px-3 text-white hover:bg-gray-600 rounded-b-md'>
                                <span className="material-symbols-outlined scale-75">delete</span>
                                Delete
                            </button>
                        </div>
                    </div>
                }
            </div>

            <div className='ml-9'>
                <div className='flex flex-nowrap justify-start'>
                    <button onClick={toggleLike}
                        title={reply.isLikedByMe ? "Unlike" : "Like"}
                        className='mt-[2px] text-gray-400'
                    >
                        {
                            reply.isLikedByMe ?
                                <img alt='like'
                                    className='w-4 m-0 h-4 hover:scale-125 transition-transform
                                     duration-300 ease-in-out'
                                    src='https://res.cloudinary.com/dvrpvl53d/image/upload/v1709992461/8294893_n5a1la.png' />
                                : <span
                                    className='material-symbols-outlined scale-75 hover:scale-100 transition-transform duration-300 ease-in-out'>
                                    favorite
                                </span>
                        }
                    </button>
                    <span className='ml-[1px] block mt-1 text-[12px] text-gray-400'>
                        {reply.likesCount}
                    </span>

                    <button onClick={()=>showReplyCreateForm(reply.owner.username)}
                        className='flex bg-gray-800 hover:bg-gray-700 ml-5 flex-nowrap justify-start text-[10px] border rounded-full mt-1 h-5 py-[1px] px-2'>
                        Reply
                    </button>
                </div>
            </div>
        </div>
    )
})
