import React,{useEffect,useState,memo} from 'react'
import Input from "../utilComponents/Input";
import {useForm} from 'react-hook-form';
import { assetService } from '../../apiServices/asset';
import { conf } from '../../conf/conf';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default memo(function CreateAudioAsset({isCreateAudioAssetRendering, setIsCreateAudioAssetRendering, setAudios}) {
    const {register, handleSubmit} = useForm();
    const [disabled, setDisabled] = useState(false);
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const handleOutsideClick = (event) => {
        if (isCreateAudioAssetRendering && !event.target.closest('.menu-container')) {
          setIsCreateAudioAssetRendering(false);
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
            resourceType: 'auto',
            sources: ['local', 'url', "google_drive",],
            secure: true,
            multiple: false,
            maxImageFileSize: 15000000,
            clientAllowedFormats: ['mp3', 'wav', 'ogg', 'flac'],
        }, async (error, result) => {
            if (!error && result && result.event === "success") {
                const response = await assetService.createNewAsset({
                    title: data.title.trim(),
                    assetType: "audio",
                    assetURL: result.info.secure_url,
                    assetPublicId: result.info.public_id,
                    isPublic: data.isPublic === "true"? true : false,
                })
                if (response.status < 400 && response.data) {
                    dispatch(addNotification({ type: "success", text: response.message }))
                    response.data.isLikedByMe = false;
                    response.data.likesCount=0;
                    response.data.owner={_id:user._id,username:user.username,avatar:user.avatar,fullName:user.fullName};
                    setAudios(prev=>[response.data,...prev]);
                    setIsCreateAudioAssetRendering(false);
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
                    Create New Audio Asset
                </p>
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                    type='text' 
                    lable='Audio Title :' 
                    placeholder='Title' 
                    required={true}
                    {...register('title')} /> <br /><br />

                    <label className='text-white font-semibold block mb-1'
                    htmlFor="assetAudioType">
                        Asset Type :
                    </label>
                    <select
                    className='bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
                    id="assetAudioType" 
                    {...register('isPublic')} 
                    defaultValue={"true"}
                    required={true}>
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select> <br /> <br />

                    <input 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg'
                    value={"Upload Audio"}
                    readOnly={disabled}
                    type="submit" />
                    <p className='text-red-500'>
                        Max Size 15 MB
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
})