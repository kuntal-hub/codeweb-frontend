import React,{useEffect,useState} from 'react'
import MainContainer from '../components/MainContainer'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { authServices } from '../apiServices/auth'
import { useDispatch,useSelector } from 'react-redux'
import {setProfile} from "../store/profileSlice"
import ShowFollower from '../components/userComponents/ShowFollower'

export default function Profile() {
    const { username } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.userData)
    const profile = useSelector(state => state.profile.profile)
    const [error,setError] = useState(null)
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

    useEffect(() => {
       if (!profile || profile.username !== username) {
        authServices.getUserProfile({username})
        .then(res => {
            if (res.status < 400 && res.data) {
                dispatch(setProfile(res.data))
            } else {
                setError('User not found')
            }
        })
       }
    }, [username])

  return (
    <MainContainer>
        <div className='w-full bg-gray-950 h-full overflow-y-auto text-white'>
            {profile && <>
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
                <div className='flex flex-wrap justify-between'>
                    <div className='flex flex-nowrap pt-2 px-2'>
                        <span className='font-bold md:text-xl'>{profile.fullName}</span>
                        <span className='text-gray-500 text-[12px] font-semibold mt-1 ml-1 md:ml-2'>@{profile.username}</span>
                    </div>
                    <div className='flex flex-nowrap pt-1 px-1 lg:mx-2 xl:mx-4'>
                        <button 
                        className='font-semibold text-[13px] md:text-[15px] hover:text-green-600 mr-3 md:mr-5'>
                            {profile.followersCount} Followers</button>
                        <button 
                        className='font-semibold text-[13px] md:text-[15px] hover:text-green-600'>
                            {profile.followingCount} Following</button>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between px-2'>
                    <p className='text-gray-400 font-semibold text-[14px] py-1'>
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
            </>}
        </div>

    </MainContainer>
  )
}
