import React,{useEffect,useState,memo} from 'react'
import Input from "../utilComponents/Input";
import {useForm} from 'react-hook-form';
import { assetService } from '../../apiServices/asset';
import { conf } from '../../conf/conf';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default memo(function CreateVideoAsset({isCreateVideoAssetRendering, setIsCreateVideoAssetRendering, setVideos}) {
    const {register, handleSubmit} = useForm();
    const [disabled, setDisabled] = useState(false);
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const handleOutsideClick = (event) => {
        if (isCreateVideoAssetRendering && !event.target.closest('.menu-container')) {
          setIsCreateVideoAssetRendering(false);
        }
      };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

    const submit = (data) => {
        setDisabled(true);
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: conf.cloudinaryCloudName,
            uploadPreset: conf.cloudinaryUploadPreset,
            folder: 'codeweb',
            resourceType: 'video',
            sources: ['local', 'url', 'camera', 'image_search', "google_drive",],
            secure: true,
            multiple: false,
            maxImageFileSize: 50000000,
            clientAllowedFormats: ["mp4", "webm", "ogg","mov"],
        }, async (error, result) => {
            if (!error && result && result.event === "success") {
                const response = await assetService.createNewAsset({
                    title: data.title.trim(),
                    assetType: "video",
                    assetURL: result.info.secure_url,
                    assetPublicId: result.info.public_id,
                    isPublic: data.isPublic === "true"? true : false,
                })
                if (response.status < 400 && response.data) {
                    dispatch(addNotification({ type: "success", text: response.message }))
                    response.data.isLikedByMe = false;
                    response.data.likesCount=0;
                    response.data.owner={_id:user._id,username:user.username,avatar:user.avatar,fullName:user.fullName};
                    setVideos(prev=>[response.data,...prev]);
                    setIsCreateVideoAssetRendering(false);
                } else if (response.status >= 400 || !response.data) {
                    dispatch(addNotification({ type: "error", text: response.message }))
                }
            }
        }
        )

        myWidget.open()
        setDisabled(false);
    }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen grid place-content-center half_transparent z-30'>
        <div className='GB-cointainer p-1 menu-container'>
            <div className='p-5 pb-8 bg-gray-900 rounded-md text-center w-[92vw] sm:w-[75vw] md:w-[60vw] lg:w-[38vw]'>
                <p className='text-2xl font-bold text-white mb-6'>
                    Create New Video Asset
                </p>
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                    type='text' 
                    lable='Video Title :' 
                    placeholder='Title' 
                    required={true}
                    {...register('title')} /> <br /><br />

                    <label className='text-white font-semibold block mb-1'
                    htmlFor="assetImageType">
                        Asset Type :
                    </label>
                    <select
                    className='bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
                    id="assetImageType" 
                    {...register('isPublic')} 
                    defaultValue={"true"}
                    required={true}>
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select> <br /> <br />

                    <input 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg'
                    value={"Upload Video"}
                    readOnly={disabled}
                    type="submit" />
                    <p className='text-red-500'>
                        Max Size 50 MB
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
})
