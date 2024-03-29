import React,{memo} from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { followerSearvice } from '../../apiServices/follower'

export default memo(function ExplorePeopleCard({ profile, setProfiles }) {
    const user = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    const toggleFollow = async ()=>{
        const isFollow = profile.isFollowedByMe;
        const followersCount = profile.followersCount;
        const updatedCount = isFollow ? profile.followersCount-1 : profile.followersCount+1;
        setProfiles(prev=>prev.map(p=>p._id===profile._id?{...p,isFollowedByMe:!isFollow,followersCount:updatedCount}:p))
        const res = await followerSearvice.toggleFollow({username:profile.username});
        if (res.status>=400) {
            dispatch(addNotification({type:"error",text:res.message}))
            setProfiles(prev=>prev.map(p=>p._id===profile._id?{...p,isFollowedByMe:isFollow,followersCount:followersCount}:p))
        } 
      }

    return (
        <div className='text-white w-full p-2 min-[450px]:p-3 bg-gray-800 rounded-lg flex flex-col my-2'>
            <div className='m-0 p-0 mb-2 min-[450px]:mb-3 flex flex-nowrap justify-start'>
                <Link className='w-[70px] h-[70px]' to={`/${profile.username}`}>
                <img src={profile.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_70/")} alt="avatar" className='w-ll rounded-lg' />
                </Link>
                <div className='flex flex-col ml-2'>
                    <Link to={`/${profile.username}`} className='font-semibold text-[17px] leading-5'>
                        {profile.fullName}
                    </Link>
                    <p className='text-gray-400 text-[13px]'>
                        {profile.websCount} Webs, {profile.totalWebViews} Total views
                    </p>
                    <div>
                        <span className='text-gray-300 text-[13px]'>
                            {profile.followersCount} Followers
                        </span>
                        {user && user._id !== profile._id && 
            <button onClick={toggleFollow}
            className={`${profile.isFollowedByMe ? "border bg-gray-500 hover:bg-gray-600 text-white":"bg-green-600 hover:bg-green-700"} 
            py-1 rounded-md px-2 text-[12px] ml-2 font-semibold`}>
              {profile.isFollowedByMe? "Following":"+Follow"}
            </button>}
                    </div>
                </div>
            </div>
            <div className='m-0 p-0'>
                <Link to={`/${profile.username}`} className='flex w-full flex-wrap justify-between'>
                    <div className='w-[48%] bg-gray-700 rounded-md'>
                        <img src={profile.webs[0] ? profile.webs[0].image
                            : "https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"}
                            alt="img"
                            className={`w-full ${!profile.webs[0] && "opacity-0"} rounded-md`} /></div>

                    <div className='w-[48%] bg-gray-700 rounded-md'>
                        <img src={profile.webs[1] ? profile.webs[1].image
                            : "https://res.cloudinary.com/dvrpvl53d/image/upload/v1711167882/fqmery9utu48ndudr8wd_t8j3hp_l7qmrn.jpg"}
                            alt="img"
                            className={`w-full ${!profile.webs[1] && "opacity-0"} rounded-md`} /></div>
                </Link>
            </div>

        </div>
    )
})
