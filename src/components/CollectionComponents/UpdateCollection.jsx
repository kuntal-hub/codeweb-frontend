import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { useForm } from "react-hook-form"
import Input from '../utilComponents/Input'
import { collectionService } from "../../apiServices/collection"
import {resetYourWorkCollections} from "../../store/yourWorkSlice"

export default function UpdateCollection({showUpdateCollection,setShowUpdateCollection,collection,setCollection}) {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const inputClass = "bg-gray-700 text-white w-full py-2 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"

    const handleOutsideClick = (event) => {
        if (showUpdateCollection && !event.target.closest('.menu-container')) {
          setShowUpdateCollection(false);
        }
      };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

    const createCollection = async (data)=>{
        const response = await collectionService.updateCollection({
            collectionId:collection._id,
            name:data.name.trim(),
            description:data.description,
            isPublic:data.isPublic === "true" ? true : false
        });
        if (response.status<400 && response.data) {
            dispatch(addNotification({type:"success",text:"Collection Updated Successfully"}))
            setCollection((prev)=>{return {
                ...prev,
                name:data.name.trim(),
                description:data.description,
                isPublic:data.isPublic === "true" ? true : false
            }});
            dispatch(resetYourWorkCollections());
            setShowUpdateCollection(false);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

  return (
    <div className='w-screen h-screen fixed top-0 z-30 left-0 half_transparent py-[14vh] text-white overflow-y-auto'>
    <div className='mx-auto menu-container GB-cointainer p-1 w-full block sm:w-[70%] md:w-[50%] lg:w-[40%]'>
        <div className='h-full w-full bg-gray-950 rounded-md p-3 sm:p-5 md:px-8 text-center'>
            <h1 className='text-center font-bold text-xl mb-6'>
                Edit Collection
            </h1>
            <form onSubmit={handleSubmit(createCollection)}>
                <Input
                    lable='Collection Name :'
                    name='name'
                    defaultValue={collection.name}
                    inputClass={inputClass}
                    {...register('name')}
                    required={true}
                /> <br /> 

                <label className='text-white font-semibold block mb-1'
                htmlFor="jhfgcjsdcsdjbh">
                    Description :
                </label>
                <textarea 
                {...register('description')}
                defaultValue={collection.description}
                className={inputClass}
                name="description" 
                id="jhfgcjsdcsdjbh" cols="30" rows="5"></textarea>
                <br />

                <label className='text-white font-semibold block mb-1'
                htmlFor="hgskjdghlsajkcgsh">
                    Collection Type :
                </label>
                <select name="isPublic" id="hgskjdghlsajkcgsh" 
                {...register('isPublic')}
                defaultValue={collection.isPublic ? "true" : "false"}
                className={inputClass}>
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                </select> <br /><br />

                <input type="submit" value="Save Changes"
                className='block mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md px-4 transition duration-300 ease-in-out cursor-pointer'
                />
            </form>
        </div>
    </div>
    <button className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'>
    close
</button>
</div>
  )
}
