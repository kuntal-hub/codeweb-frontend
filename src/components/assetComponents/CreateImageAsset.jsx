import React,{useEffect,useState} from 'react'
import Input from "../utilComponents/Input";
import {useForm} from 'react-hook-form';
import { assetService } from '../../apiServices/asset';

export default function CreateImageAsset({isCreateImageAssetRendering, setIsCreateImageAssetRendering, setImages}) {
    const {register, handleSubmit} = useForm();

    const handleOutsideClick = (event) => {
        if (isCreateImageAssetRendering && !event.target.closest('.menu-container')) {
          setIsCreateImageAssetRendering(false);
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
        console.log(data);
    }

  return (
    <div className='fixed top-0 left-0 h-screen w-screen grid place-content-center half_transparent z-30'>
        <div className='GB-cointainer p-1 menu-container'>
            <div className='p-5 pb-8 bg-gray-900 rounded-md text-center w-[92vw] sm:w-[75vw] md:w-[60vw] lg:w-[38vw]'>
                <p className='text-2xl font-bold text-white mb-6'>
                    Create New Image Asset
                </p>
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                    type='text' 
                    lable='Image Title :' 
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
                    value={"Upload Image"}
                    type="submit" />
                </form>
            </div>
        </div>
    </div>
  )
}
