import React,{useEffect} from 'react'
import WebDEtails from './WebDEtails'

export default function Comments({web,setShowComments,showComments}) {

    const handleOutsideClick = (event) => {
        if (showComments && !event.target.closest('.menu-container')) {
          setShowComments(false);
        }
      };

  // Adding event listener for clicks outside menu
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='w-screen min-h-screen max-h-full fixed top-0 left-0 half_transparent pt-16'>
        <div className='GB-cointainer p-1 menu-container mx-auto block w-full sm:w-[86%] md:w-[70%] xl:w-[64%] menu-container'>
            <WebDEtails web={web} />
        </div>
    </div>
  )
}
