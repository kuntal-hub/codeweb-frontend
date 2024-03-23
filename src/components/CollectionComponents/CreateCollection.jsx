import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { useForm } from "react-hook-form"
import Input from '../utilComponents/Input'
import { collectionService } from "../../apiServices/collection"

export default function CreateCollection({showCreateCollection,setShowCreateCollection}) {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const inputClass = "bg-gray-700 text-white w-full py-2 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"

    const handleOutsideClick = (event) => {
        if (showCreateCollection && !event.target.closest('.menu-container')) {
          setShowCreateCollection(false);
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
        const response = await collectionService.createCollection({
            name:data.name.trim(),
            description:data.description,
            isPublic:data.isPublic === "true" ? true : false
        });
        if (response.status<400 && response.data) {
            dispatch(addNotification({type:"success",text:"Collection Created"}))
            setShowCreateCollection(false);
        } else {
            dispatch(addNotification({type:"error",text:response.message}))
        }
    }

  return (
    <div className='w-screen h-screen fixed top-0 z-30 left-0 half_transparent py-[14vh] text-white'>
    <div className='mx-auto h-[70vh] menu-container GB-cointainer p-1 w-full block sm:w-[70%] md:w-[50%] lg:w-[40%]'>
        <div className='h-full w-full bg-gray-950 rounded-md p-3 sm:p-5 md:px-8 text-center'>
            <h1 className='text-center font-bold text-xl mb-6'>
                Create Collection
            </h1>
            <form onSubmit={handleSubmit(createCollection)}>
                <Input
                    lable='Collection Name :'
                    name='name'
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
                className={inputClass}>
                    <option value="true">Public</option>
                    <option value="false">Private</option>
                </select> <br /><br />

                <input type="submit" value="Create Collection"
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
