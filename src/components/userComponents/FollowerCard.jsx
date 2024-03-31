import React from 'react'
import { Link } from 'react-router-dom'
import { followerSearvice } from '../../apiServices/follower';

export default function FollowerCard({ follower,setFollowings,setFollowers }) {

  const toggleFollow = async () => {
    const isFollow = follower.isFollowedByMe;
    const followersCount = follower.followersCount;
    setFollowers((priv)=>priv.map((f)=>{
        if(f.username === follower.username){
            return {...f,isFollowedByMe:!isFollow,followersCount:isFollow?followersCount-1:followersCount+1}
        }
        return f
    }))
    setFollowings((priv)=>priv.map((f)=>{
        if(f.username === follower.username){
            return {...f,isFollowedByMe:!isFollow,followersCount:isFollow?followersCount-1:followersCount+1}
        }
        return f
    }))
    await followerSearvice.toggleFollow({username:follower.username});
}

  return (
    <div className='px-3 py-3 w-full flex flex-nowrap justify-between'>
      <div className='flex flex-nowrap'>
        <Link className='w-[50px]' to={`/${follower.username}`}>
          <img src={follower.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_50/")} alt="Avatar"
            className='rounded-md' />
        </Link>
        <div className='ml-2'>
          <Link to={`/${follower.username}`} className='font-semibold text-gray-200 text-[17px]'>{follower.fullName}</Link>
          <p className='text-gray-400 text-[13px]'>{follower.followersCount} Follower, {follower.websCount} Webs</p>
        </div>
      </div>

      <button onClick={toggleFollow}
      title={follower.isFollowedByMe ? "Unfollow" : "Follow"}
        className={`rounded-full px-4 h-8 ${follower.isFollowedByMe ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-500"} text-[12px] mt-2 text-white ml-2 font-semibold`}
      >
        {follower.isFollowedByMe ? "Following" : "Follow"}
      </button>

    </div>
  )
}
