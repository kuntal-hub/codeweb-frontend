import React,{memo,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Input from "../utilComponents/Input.jsx"
import {login} from "../../store/authSlice.js"
import {addNotification} from "../../store/notificationSlice.js"
import {authServices} from "../../apiServices/auth.js"
import {useForm} from "react-hook-form"

export default memo(function UpdateCover() {
    const [isDisabaled, setIsDisabled] = useState(false)
    const { register, handleSubmit } = useForm();
    const user = useSelector(state=>state.auth.userData)
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        setIsDisabled(true)
        const fullName = data.fullName.trim();
        const bio = data.bio.trim();
        const link1 = data.link1.trim();
        const link2 = data.link2.trim();
        const link3 = data.link3.trim();
        if (user.fullName === fullName && !bio && !link1 && !link2 && !link3) {
            dispatch(addNotification({type:"info",text:"Nothing to update"}))
            return
        }

        const response = await authServices.updateUser({fullName,bio,link1,link2,link3})

        if(response.status<400 && response.data){
            dispatch(login(response.data))
            dispatch(addNotification({type:"success",text:response.message}))
            setIsDisabled(false)
        } else if(response.status>=400 && !response.data){
            dispatch(addNotification({type:"error",text:response.message}))
            setIsDisabled(false)
        }
    }


  return (
    <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
        <div className='lg:w-[35%] w-full pr-4'>
            <h2 className=' w-full text-xl font-bold mb-1'>Profile Details</h2>
            <p>Let others know more about you by providing optional information.</p>
        </div> 
        <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
            <form className='w-ful lg:px-2' onSubmit={handleSubmit(onSubmit)}>
                <Input
                type="text"
                lable="Full Name :"
                placeholder="Enter Your Full Name"
                defaultValue={user.fullName}
                required={true}
                {...register("fullName")}
                /> <br /> <br />

                <Input
                type="text"
                lable="About You :"
                placeholder="Write a short bio about yourself"
                defaultValue={user.bio? user.bio :""}
                {...register("bio")}
                /> <br /> <br />

                <Input
                type="text"
                lable="Link #1 :"
                placeholder="https://twitter.com/username, https://facebook.com/username"
                defaultValue={user.link1? user.link1 :""}
                {...register("link1")}
                /> <br /><br />

                <Input
                type="text"
                lable="Link #2 :"
                placeholder="https://github.com/username, https://linkedin.com/username"
                defaultValue={user.link2? user.link2 :""}
                {...register("link2")}
                /> <br /><br />

                <Input
                type="text"
                lable="Link #3 :"
                placeholder="https://instagram.com/username, https://youtube.com/username"
                defaultValue={user.link3? user.link3 :""}
                {...register("link3")}
                /> <br /> <br />

                <input type="submit" value="Save Chenges" readOnly={isDisabaled}
                className='bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                />
            </form>
        </div>           
    </div>
  )
})