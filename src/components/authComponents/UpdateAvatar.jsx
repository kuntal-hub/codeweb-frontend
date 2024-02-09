import React,{memo,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {login} from "../../store/authSlice.js"
import {conf} from "../../conf/conf.js"
import {addNotification} from "../../store/notificationSlice.js"
import {authServices} from "../../apiServices/auth.js"

export default memo(function UpdateAvatar({isDisabled=true}) {
    const [isUploading, setIsUploading] = useState(false)
    const user = useSelector(state=>state.auth.userData)
    const dispatch = useDispatch()

    const handelDelete = async ()=>{
        const res = await authServices.updateAvatar({
            image:"https://res.cloudinary.com/dvrpvl53d/image/upload/v1705401447/vbhdn2mo3facgwbanema.jpg",
            public_id:"vbhdn2mo3facgwbanema"})

        if (res.status<400 && res.data) {
            dispatch(login(res.data))
            dispatch(addNotification({type:"success",text:res.message}))
        } else if(res.status>=400 || !res.data){
            dispatch(addNotification({type:"error",text:res.message}))
        }
    }


    const handelUpload = async ()=>{
        setIsUploading(true)
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: conf.cloudinaryCloudName, 
            uploadPreset: conf.cloudinaryUploadPreset,
            folder: 'codeweb',
            resourceType: 'image',
            sources: [ 'local', 'url', 'camera', 'image_search', "google_drive",],
            secure: true,
            multiple: false,
            cropping: true,
            showSkipCropButton: false,
            croppingDefaultSelectionRatio: 1.0,
            croppingAspectRatio: 1.0,
            croppingShowDimensions: true,
            croppingCoordinatesMode:"face",
          },async (error, result) => { 
              if (!error && result && result.event === "success") { 
                const response = await authServices.updateAvatar({
                    image:result.info.secure_url,
                    public_id:result.info.public_id
                })
                if (response.status<400 && response.data) {
                    dispatch(login(response.data))
                    dispatch(addNotification({type:"success",text:response.message}))
                } else if(response.status>=400 || !response.data){
                    dispatch(addNotification({type:"error",text:response.message}))
                }
              }
            }
        )

        myWidget.open()
        return setIsUploading(false)
    }

  return (
    <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
        <h2 className='lg:w-[35%] w-full text-xl font-bold'>Profile Image</h2> 
        <div className='lg:w-[65%] w-full flex flex-nowrap mt-5 lg:mt-0 p-4 bg-gray-800 rounded-lg'>
            
            <img src={user.avatar.replace("upload/","upload/ar_1.0,g_face,c_fill,w_250/")} alt="profile image" className='w-36 lg:w-40 h-auto rounded-2xl' />
            
            <div className='flex flex-col ml-5'>
                <p className=' font-semibold text-white text-sm sm:text-lg'>Update Your Avatar</p>
                <button className='flex flex-nowrap justify-center p-3 rounded-lg bg-blue-600 my-2 hover:bg-blue-500 font-semibold'
                    onClick={handelUpload}
                    disabled={isDisabled || isUploading}
                >
                    {isDisabled ? "Loading..." : isUploading ? "Uploading..." : <>
                    <span className='material-symbols-outlined'>upload</span><span>Upload</span>
                    </>}
                </button>

                {user.avatarPublicId !== "vbhdn2mo3facgwbanema" && 
                <button className='flex flex-nowrap justify-center p-3 rounded-lg bg-blue-600 my-2 hover:bg-blue-500 font-semibold'
                onClick={handelDelete}
                >
                <span className='material-symbols-outlined'>delete</span><span>Remove</span>
                </button>
                }
                
            </div>
        </div>           
    </div>
  )
})
