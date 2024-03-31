import React, { useEffect, useState } from 'react'
import MainContainer from '../components/MainContainer'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { authServices } from '../apiServices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile, setShowcaseWebs, resetAll } from "../store/profileSlice"
import ShowFollower from '../components/userComponents/ShowFollower'
import { followerSearvice } from '../apiServices/follower'

export default function Profile() {
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.userData)
    const profile = useSelector(state => state.profile.profile)
    const [error, setError] = useState(null)
    const [showFollowerOrFollowing, setShowFollowerOrFollowing] = useState("");
    const [activeTab, setActiveTab] = useState(!window.location.pathname.includes("collections") ? "webs" : "collections");
    if (error) {
        throw new Error(error)
    }
    document.title = 'Profile -' + username

    function getDomainName(url) {
        // Create a new URL object
        let parsedUrl = new URL(url);

        // Extract and return the domain name
        return parsedUrl.hostname;
    }

    const toggleFollow = async ()=>{
        const isFollow = profile.isFollowedByMe;
        const followersCount = profile.followersCount;
        dispatch(setProfile({...profile,isFollowedByMe:!isFollow,followersCount:isFollow?followersCount-1:followersCount+1}))
        await followerSearvice.toggleFollow({username:profile.username})
    }

    useEffect(() => {
        if (!profile || profile.username !== username) {
            dispatch(resetAll())
            authServices.getUserProfile({ username })
                .then(res => {
                    if (res.status < 400 && res.data) {
                        dispatch(setProfile(res.data))
                        dispatch(setShowcaseWebs(res.data.showcase))
                    } else {
                        setError('User not found')
                    }
                })
        }
    }, [username])

    return (
        <MainContainer>
            <div className='w-full bg-gray-900 h-full overflow-y-auto text-white'>
                {profile ? <>
                    <div className='w-full relative'>
                        <img src={profile.coverImage.replace("upload/", "upload/ar_4.5,g_custom,c_fill,w_1000/")}
                            alt="bg"
                            className='w-full opacity-80' />
                        <div className='absolute top-[5%] left-[50%] translate-x-[-50%] lg:top-[10%]'>
                            <div className='border-[1px] w-[20vw] md:w-[15vw] rounded-md'>
                                <img src={profile.avatar.replace("upload/", "upload/ar_1.0,g_face,c_fill,w_600/")} alt="Avatar"
                                    className='border-[3px] border-gray-700 w-full rounded-md lg:border-[4px] ' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between bg-gray-950'>
                        <div className='flex flex-nowrap pt-2 px-2 md:ml-4'>
                            <span className='font-bold md:text-xl'>{profile.fullName}</span>
                            <span className='text-gray-500 text-[12px] font-semibold mt-1 ml-1 md:ml-2'>@{profile.username}</span>
                        </div>
                        <div className='flex flex-nowrap pt-1 px-1 lg:mx-2 xl:mx-4'>
                            <button onClick={() => setShowFollowerOrFollowing("followers")}
                                disabled={!user || profile.followersCount === 0}
                                className='font-semibold text-[13px] md:text-[15px] hover:text-green-600 mr-3 md:mr-4'>
                                {profile.followersCount} Followers</button>
                            <button onClick={() => setShowFollowerOrFollowing("following")}
                                disabled={!user || profile.followingCount === 0}
                                className='font-semibold text-[13px] md:text-[15px] hover:text-green-600'>
                                {profile.followingCount} Following</button>
                            {user && user.username !== profile.username &&
                            <button onClick={toggleFollow}
                                title={profile.isFollowedByMe ? "Unfollow" : "Follow"}
                                className={`rounded-full px-4 h-8 ${profile.isFollowedByMe ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-500"} text-[12px] mt-2 text-white ml-2 font-semibold`}
                            >
                                {profile.isFollowedByMe ? "Following" : "Follow"}
                            </button>}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between px-2 bg-gray-950 pb-2'>
                        <p className='text-gray-400 font-semibold text-[14px] py-1 md:ml-4'>
                            {profile.bio}
                        </p>
                        <div className='flex flex-nowrap justify-between py-1'>
                            {profile.link1 && <a href={profile.link1} target="_blank" rel="noopener noreferrer"
                                className='text-[14px] mr-5 text-gray-400 hover:text-blue-500 hover:underline'>
                                {getDomainName(profile.link1)}
                            </a>}
                            {profile.link2 && <a href={profile.link2} target="_blank" rel="noopener noreferrer"
                                className='text-[14px] mx-5 text-gray-400 hover:text-blue-500 hover:underline'>
                                {getDomainName(profile.link2)}
                            </a>}
                            {profile.link3 && <a href={profile.link3} target="_blank" rel="noopener noreferrer"
                                className='text-[14px] ml-5 text-gray-400 hover:text-blue-500 hover:underline'>
                                {getDomainName(profile.link3)}
                            </a>}
                        </div>
                    </div>

                    <div className='w-[96%] lg:w-[92%] mx-auto'>
                        <div className='w-full flex flex-nowrap mt-5'>
                                <button onClick={() => {
                                    setActiveTab("webs")
                                    navigate(`/${profile.username}/webs`)
                                }}
                                className={`font-bold text-[17px] text-gray-500 mr-2 ${activeTab === "webs" && "text-white"}`}
                                >Webs</button>
                                <button onClick={() => {
                                    setActiveTab("collections")
                                    navigate(`/${profile.username}/collections`)
                                }}
                                className={`font-bold text-[17px] text-gray-500 ml-2 ${activeTab !== "webs" && "text-white"}`}
                                >Collections</button>
                        </div>
                        <Outlet />
                    </div>
                </> :<div className='bg-gray-950 grid place-content-center w-full h-full'>
            <div className="loader"></div>
          </div>}
            </div>
            {showFollowerOrFollowing &&
                <ShowFollower
                    showFollowerOrFollowing={showFollowerOrFollowing}
                    setShowFollowerOrFollowing={setShowFollowerOrFollowing}
                    username={username} />
            }
        </MainContainer>
    )
}
