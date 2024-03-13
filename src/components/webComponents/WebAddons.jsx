import React,{useEffect,useState} from 'react'
import CssAddons from './CssAddons';
import JsAddons from './JsAddons';
import HtmlAddons from './HtmlAddons';

export default function WebAddons({showAddons,setShowAddons,owner}) {
  const [showHtmlAddons, setShowHtmlAddons] = useState(true);
    const [showCssAddons, setShowCssAddons] = useState(false);
    const [showJsAddons, setShowJsAddons] = useState(false);

    const handleOutsideClick = (event) => {
        if (showAddons && !event.target.closest('.menu-container')) {
          setShowAddons(false);
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
    <>
    <div className='half_transparent h-screen w-screen fixed top-0 left-0 z-20 grid place-content-center'>
      <div className='GB-cointainer p-1 menu-container'>
        <div className='w-[94vw] bg-gray-950 md:w-[80vw] lg:w-[70vw] h-screen-60px rounded-lg'>
          <div className='w-full text-white flex flex-nowrap justify-center overflow-x-auto bg-gray-800 rounded-t-lg'>
            <button onClick={() => {
              setShowHtmlAddons(true);
              setShowCssAddons(false); 
              setShowJsAddons(false)
            }}
              className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showHtmlAddons ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
              HTML
            </button>
            <button onClick={() => {
              setShowHtmlAddons(false)
              setShowCssAddons(true); 
              setShowJsAddons(false);
            }}
              className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showCssAddons ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
              CSS
            </button>
            <button onClick={() => {
              setShowHtmlAddons(false);
              setShowCssAddons(false); 
              setShowJsAddons(true)
            }}
              className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showJsAddons ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
              JS
            </button>
          </div>
                {showCssAddons && <CssAddons owner={owner} />}
                {showJsAddons && <JsAddons owner={owner} />}
                {showHtmlAddons && <HtmlAddons owner={owner} />}
        </div>
      </div>
    </div>
    <button className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'>
        close
    </button>
  </>
  )
}
