import React, { useState,memo } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { chengeTitleAndDesc } from "../../store/webSlice.js"
import Input from '../utilComponents/Input';

export default memo(function SetTitleDescpiption({ setShowTitleDescpiption }) {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const webTitle = useSelector(state => state.webs.title);
    const webDescription = useSelector(state => state.webs.description);
    const [isDisabaled, setIsDisabled] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const submit = (data) => {
        setIsDisabled(true);
        if (data.title==="Untitled" || data.title.trim()==="") {
            setTitleError("Title can't be empty or 'Untitled'");
            setIsDisabled(false);
            return;
        }
        if (data.description.trim()==="") {
            setDescriptionError("Description can't be empty");
            setIsDisabled(false);
            return;
        }
        dispatch(chengeTitleAndDesc({ title: data.title.trim(), description: data.description.trim() }));
        setShowTitleDescpiption(false);
    }

    return (
        <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
            <div className='GB-cointainer p-1'>
                <div className='bg-gray-900 text-white p-5 overflow-auto'>
                    <button onClick={() => setShowTitleDescpiption(false)}
                        className='block material-symbols-outlined text-right w-full text-white'>
                        close
                    </button>
                    <h1 className='text-3xl md:text-[40px] text-center font-bold mb-3'>Hold Up!</h1>
                    <p className='text-gray-400 text-center'>
                        You need to set a title and description for your Web.
                    </p>
                    <p className='text-gray-400 text-center'>
                        This will help you and others to understand what your Web is about.
                    </p>
                    <div className='p-3 mt-5'>
                        <form onSubmit={handleSubmit(submit)}>
                            <Input
                                type='text'
                                lable='Title :'
                                placeholder='Enter Your Web Title Here'
                                defaultValue={webTitle}
                                required={true}
                                {...register('title', { required: true })}
                            /> <br />
                            <p className='text-red-500 font-semibold text-sm'>{titleError}</p>
                            <br />

                            <label className='text-white font-semibold block mb-1'
                                htmlFor="descriptionjkdfjh">Description :</label>
                            <textarea name="" id="descriptionjkdfjh" cols="20" rows="10"
                                placeholder='Enter Your Web Description Here'
                                defaultValue={webDescription}
                                required={true}
                                {...register('description', { required: true })}
                                className="bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                            ></textarea>
                            <br />
                            <p className='text-red-500 font-semibold text-sm'>{descriptionError}</p>
                            <br />
                            <input type="submit" value="Set Chenges" readOnly={isDisabaled}
                                className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})
