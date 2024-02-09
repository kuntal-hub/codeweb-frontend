import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/authSlice.js"
import { conf } from "../../conf/conf.js"
import { addNotification } from "../../store/notificationSlice.js"
import { authServices } from "../../apiServices/auth.js"

export default memo(function UpdateCover({ isDisabled = true }) {
    const [isUploading, setIsUploading] = useState(false)
    const user = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    const handelDelete = async () => {
        const res = await authServices.updateCoverImage({
            image: "https://res.cloudinary.com/dvrpvl53d/image/upload/v1705401598/l1bthaxmnngyxabxmhwi.jpg",
            public_id: "l1bthaxmnngyxabxmhwi"
        })

        if (res.status < 400 && res.data) {
            dispatch(login(res.data))
            dispatch(addNotification({ type: "success", text: res.message }))
        } else if (res.status >= 400 || !res.data) {
            dispatch(addNotification({ type: "error", text: res.message }))
        }
    }


    const handelUpload = async () => {
        setIsUploading(true)
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: conf.cloudinaryCloudName,
            uploadPreset: conf.cloudinaryUploadPreset,
            folder: 'codeweb',
            resourceType: 'image',
            sources: ['local', 'url', 'camera', 'image_search', "google_drive",],
            secure: true,
            multiple: false,
            cropping: true,
            showSkipCropButton: false,
            croppingCoordinatesMode: 'custom',
            croppingDefaultSelectionRatio: 9 / 2,
            croppingAspectRatio: 9 / 2,
            croppingShowDimensions: true,
        }, async (error, result) => {
            if (!error && result && result.event === "success") {
                const response = await authServices.updateCoverImage({
                    image: result.info.secure_url,
                    public_id: result.info.public_id
                })
                if (response.status < 400 && response.data) {
                    dispatch(login(response.data))
                    dispatch(addNotification({ type: "success", text: response.message }))
                } else if (response.status >= 400 || !response.data) {
                    dispatch(addNotification({ type: "error", text: response.message }))
                }
            }
        }
        )

        myWidget.open()
        return setIsUploading(false)
    }

    return (
        <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
            <div className='lg:w-[35%] w-full capitalize pr-4'>
                <h2 className=' w-full text-xl font-bold mb-1'>Cover Image</h2>
                <p>Make your profile more organize and beautifull</p>
            </div>
            <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>

                <img src={user.coverImage.replace("upload/", "upload/ar_4.5,g_custom,c_fill,w_1000/")} alt="profile image" className='block w-full h-auto rounded-2xl' />
                <p className=' font-semibold text-white block my-2 ml-4 text-sm sm:text-lg'>Update Your Cover Image</p>

                <div className='flex flex-nowrap justify-center'>
                    <button className='flex flex-nowrap justify-center p-3 m-3 rounded-lg bg-blue-600 my-2 hover:bg-blue-500 font-semibold'
                        onClick={handelUpload}
                        disabled={isDisabled || isUploading}
                    >
                        {isDisabled ? "Loading..." : isUploading ? "Uploading..." : <>
                            <span className='material-symbols-outlined'>upload</span><span>Upload</span>
                        </>}
                    </button>

                    {user.coverImagePublicId !== "l1bthaxmnngyxabxmhwi" &&
                        <button className='flex flex-nowrap justify-center p-3 m-3 rounded-lg bg-blue-600 my-2 hover:bg-blue-500 font-semibold'
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
