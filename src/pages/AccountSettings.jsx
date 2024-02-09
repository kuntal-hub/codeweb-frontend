import React,{useState} from 'react';
import "../cssFiles/utils.css";
import UpdateEmail from '../components/authComponents/UpdateEmail';
import UpdatePassword from '../components/authComponents/UpdatePassword';
import RequestVerifyEmail from '../components/authComponents/RequestVerifyEmail';
import DeleteAccount from '../components/authComponents/DeleteAccount';

export default function ProfileSettings() {
  const [isDeleteAccountComponentRendered, setIsDeleteAccountComponentRendered] = useState(false);

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
      <RequestVerifyEmail/>
      <UpdateEmail/>
      <UpdatePassword/>

      <div className='w-full flex flex-col lg:flex-nowrap lg:flex-row p-5'>
            <div className='lg:w-[35%] w-full capitalize pr-4'>
                <h2 className=' w-full text-xl font-bold mb-1 text-red-600'>Danger Zone</h2>
                <p className='text-red-500 text-sm'>Deleting your account will wipe all information about you and content you’ve created on CodePen.</p>
            </div>
            <div className='lg:w-[65%] w-full mt-5 lg:mt-0 p-4 flex flex-col bg-gray-800 rounded-lg'>
              <button onClick={() => setIsDeleteAccountComponentRendered(true)}
                className=' w-48 block mx-auto bg-red-500 text-white py-3 px-4 font-semibold rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-center hover:bg-red-700 hover:shadow-lg hover:scale-105 transform hover:duration-300'
              >
                Delete Account
              </button>
            </div>
        </div>
          {isDeleteAccountComponentRendered && <DeleteAccount 
          setIsDeleteAccountComponentRendered={setIsDeleteAccountComponentRendered}/>}
    </div>
  )
}