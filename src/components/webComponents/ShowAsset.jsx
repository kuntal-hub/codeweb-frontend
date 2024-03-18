import React, { useEffect, useState } from 'react'
import Icons from './Icons';
import Fonts from './Fonts';
import Patterns from './Patterns';
import Images from './Images';
import Videos from './Videos';
import Audios from './Audios';

export default function ShowAsset({ setShowAsset, showAsset }) {
  const [showIcons, setShowIcons] = useState(true);
  const [showFonts, setShowFonts] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showAudios, setShowAudios] = useState(false);
  const [showPatterns, setShowPatterns] = useState(false);


  const handleOutsideClick = (event) => {
    if (showAsset && !event.target.closest('.menu-container')) {
      setShowAsset(false);
    }
  };

  const chengeTab = (tab) => {
    setShowIcons(false);
    setShowFonts(false);
    setShowImages(false);
    setShowVideos(false);
    setShowAudios(false);
    setShowPatterns(false);
    switch (tab) {
      case 'Icons':
        setShowIcons(true);
        break;
      case 'Fonts':
        setShowFonts(true);
        break;
      case 'Images':
        setShowImages(true);
        break;
      case 'Videos':
        setShowVideos(true);
        break;
      case 'Audios':
        setShowAudios(true);
        break;
      case 'Patterns':
        setShowPatterns(true);
        break;
      default:
        setShowIcons(true);
        break;
    }
  }

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
              <button onClick={() => chengeTab('Icons')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showIcons ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Icons
              </button>
              <button onClick={() => chengeTab('Fonts')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showFonts ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Fonts
              </button>
              <button onClick={() => chengeTab('Patterns')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showPatterns ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Patterns
              </button>
              <button onClick={() => chengeTab('Images')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showImages ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Images
              </button>
              <button onClick={() => chengeTab('Videos')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showVideos ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Videos
              </button>
              <button onClick={() => chengeTab('Audios')}
                className={`py-2 px-2 md:px-4 font-semibold hover:bg-gray-700 ${showAudios ? "bg-gray-700 border-b-4 border-b-green-600" : ""}`}>
                Audios
              </button>
            </div>
            {showIcons && <Icons />}
            {showFonts && <Fonts />}
            {showPatterns && <Patterns />}
            {showImages && <Images />}
            {showVideos && <Videos />}
            {showAudios && <Audios />}
          </div>
        </div>
      </div>
      <button className='material-symbols-outlined fixed top-1 right-1 text-white z-30 bg-slate-800 rounded-md border border-white'>
          close
      </button>
    </>
  )
}
