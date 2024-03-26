import React, { useEffect, useState } from 'react'
import { webService } from '../../apiServices/web'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '../../store/notificationSlice'
import { setTrendings } from '../../store/trendingSlice'
import { useForm } from 'react-hook-form'
import Input from '../utilComponents/Input'

export default function UpdateWebDetails({ web, setWebDetails, setShowUpdateWebDetails, showUpdateWebDetails }) {
    const dispatch = useDispatch();
    const trendings = useSelector(state => state.trending.trendings);
    const trendingResData = useSelector(state => state.trending.trendingResData);
    const { register, handleSubmit } = useForm();
    const [isDisabaled, setIsDisabled] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const handleOutsideClick = (event) => {
        if (showUpdateWebDetails && !event.target.closest('.menu-container')) {
            setShowUpdateWebDetails(false);
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
        setIsDisabled(true);
        if (data.title === "Untitled" || data.title.trim() === "") {
            setTitleError("Title can't be empty or 'Untitled'");
            setIsDisabled(false);
            return;
        }
        if (data.description.trim() === "") {
            setDescriptionError("Description can't be empty");
            setIsDisabled(false);
            return;
        }
        const response = await webService.updateWeb({
            webId: web._id,
            title: data.title.trim(),
            description: data.description.trim(),
            isPublic: data.isPublic
        });
        if (response.status < 400 && response.data) {
            dispatch(addNotification({ type: "success", text: "Web Details Updated Successfully!" }));
            setWebDetails(priv => {
                return {
                    ...priv,
                    title: data.title.trim(),
                    description: data.description.trim(),
                    isPublic: data.isPublic === "true" ? true : false
                }
            })
            if (window.location.pathname === `/details/${web._id}` || window.location.pathname === `/details/${web._id}/`) {
                if (!trendingResData) return setShowUpdateWebDetails(false);
                if (data.isPublic !== "true") {
                    dispatch(setTrendings(trendings.filter(w => w._id !== web._id)))
                } else {
                    dispatch(setTrendings(
                        trendings.map((w) => {
                            if (w._id === web._id) {
                                return {
                                    ...w,
                                    title: data.title.trim(),
                                    description: data.description.trim(),
                                    isPublic: data.isPublic === "true" ? true : false
                                }
                            } else {
                                return w;
                            }
                        })
                    ))
                }
            }
            setShowUpdateWebDetails(false);
        } else {
            dispatch(addNotification({ type: "error", text: response.message }));
        }
    }

    return (
        <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-30 overflow-y-auto py-16'>
            <div className='GB-cointainer p-1 menu-container block mx-auto w-[96vw] sm:w-[74vw] md:w-[54vw] lg:w-[40vw] xl:w-[34vw]'>
                <div className='bg-gray-900 text-white p-5 overflow-auto rounded-lg'>
                    <h1 className='text-2xl text-center font-bold mb-3'>Update your Web details.</h1>
                    <p className='text-gray-400 text-center'>
                        Update your Web title, description and Publish status.
                    </p>
                    <p className='text-gray-400 text-center'>
                        This will help you and others to understand what your Web is about.
                    </p>
                    <div className='p-3 mt-5'>
                        <form onSubmit={handleSubmit(submit)}>
                            <Input
                                type='text'
                                labelClass="text-white font-semibold block mb-1 text-center"
                                lable='Title :'
                                placeholder='Enter Your Web Title Here'
                                defaultValue={web.title}
                                required={true}
                                {...register('title', { required: true })}
                            /> <br />
                            <p className='text-red-500 font-semibold text-sm'>{titleError}</p>

                            <label className='text-white font-semibold block mb-1 text-center'
                                htmlFor="descriptionjkdfjh">Description :</label>
                            <textarea name="" id="descriptionjkdfjh" cols="20" rows="5"
                                placeholder='Enter Your Web Description Here'
                                defaultValue={web.description}
                                required={true}
                                {...register('description', { required: true })}
                                className="bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                            ></textarea>
                            <br />
                            <p className='text-red-500 font-semibold text-sm'>{descriptionError}</p>


                            <label className='text-white font-semibold block mb-1 text-center'
                                htmlFor="webIsPublic">
                                Web Type :
                            </label>
                            <select name="" id="webIsPublic"
                                className="bg-gray-200 text-black w-full py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                defaultValue={web.isPublic}
                                {...register('isPublic')}
                            >
                                <option value="true">Public</option>
                                <option value="false">Private</option>
                            </select>
                            <input type="submit" value="Save Chenges" readOnly={isDisabaled}
                                className='bg-green-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 float-right mt-5'
                            />
                        </form>
                        <button onClick={() => setShowUpdateWebDetails(false)}
                            className='bg-red-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 float-left mt-5'
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
