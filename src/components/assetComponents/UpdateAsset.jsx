import React,{useEffect,useState,memo} from 'react'
import Input from "../utilComponents/Input";
import {useForm} from 'react-hook-form';
import { assetService } from '../../apiServices/asset';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default memo(function UpdateAsset({showUpdateAsset, setShowUpdateAsset, asset,getPublicAssets}) {
    const {register, handleSubmit} = useForm();
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const handleOutsideClick = (event) => {
        if (showUpdateAsset && !event.target.closest('.menu-container')) {
          setShowUpdateAsset(false);
        }
    };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

    const submit = async (data) => {
        setDisabled(true);
        const response = await assetService.updateAssetById({
            assetId:asset._id,
            title:data.title,
            isPublic:data.isPublic === "true" ? true : false
        })
        if (response.status < 400 && response.data) {
            dispatch(addNotification({text:"Asset Updated Succesfully!",type:"success"}))
            setShowUpdateAsset(false);
            getPublicAssets(1)
        } else{
            dispatch(addNotification({text:response.message,type:"error"}))
            setDisabled(false);
        }
    }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen grid place-content-center half_transparent z-30'>
        <div className='GB-cointainer p-1 menu-container'>
            <div className='p-5 pb-8 bg-gray-900 rounded-md text-center w-[92vw] sm:w-[75vw] md:w-[60vw] lg:w-[38vw]'>
                <p className='text-2xl font-bold text-white mb-6'>
                    Update Your Asset
                </p>
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                    type='text' 
                    lable='Asset Title :' 
                    defaultValue={asset.title}
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
                    defaultValue={asset.isPublic}
                    required={true}>
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select> <br /> <br />

                    <input 
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg'
                    value={"Save Changes"}
                    readOnly={disabled}
                    type="submit" />
                </form>
            </div>
        </div>
        <button
        className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'
        >
            close
        </button>
    </div>
  )
})