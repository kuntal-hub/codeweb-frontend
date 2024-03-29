import React, { useState, useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import { useNavigate } from 'react-router-dom'
import SearchCollection from '../components/SearchCollection'
import SearchUser from '../components/SearchUser'
import SearchWeb from '../components/SearchWeb'

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate()
  const [mode, setMode] = useState('web')
  document.title = 'Search - '+urlParams.get('q')

  const chengeMode = (mode)=>{
    urlParams.set('type', mode)
    navigate(`/search?${urlParams.toString()}`)
  }

  useEffect(() => {
    if (!urlParams.has('type')) {
      setMode('web')
    } else{
      setMode(urlParams.get('type'))
    }
  }, [urlParams.get('type')])

  return (
    <MainContainer>
      <div className='w-full h-full bg-gray-950 text-white'>
        <div className='w-full p-1 flex flex-wrap justify-start'>
          <button onClick={()=>chengeMode('web')}
            className={`flex flex-nowrap justify-center text-sm font-semibold py-1 px-2 mx-1 hbl text-white hover:bg-gray-600 rounded-md  
            leading-3 ${mode==="web" ? "bg-gray-600":"bg-gray-900"}`}>
            <span className={`material-symbols-outlined scale-75 cngcolor ${mode==="web" ? "text-green-600":"text-white"}`}>laptop</span>
            <span className='block mt-1'>Webs</span>
          </button>

          <button onClick={()=>chengeMode('collection')}
            className={`flex flex-nowrap justify-center text-sm font-semibold py-1 px-2 mx-1 hbl text-white hover:bg-gray-600 rounded-md  
            leading-3 ${mode==="collection" ? "bg-gray-600":"bg-gray-900"}`}>
            <span className={`material-symbols-outlined scale-75 cngcolor ${mode==="collection" ? "text-green-600":"text-white"}`}>collections</span>
            <span className='block mt-1'>Collections</span>
          </button>

          <button onClick={()=>chengeMode('profile')}
            className={`flex flex-nowrap justify-center text-sm font-semibold py-1 px-2 mx-1 hbl text-white hover:bg-gray-600 rounded-md  
            leading-3 ${mode==="profile" ? "bg-gray-600":"bg-gray-900"}`}>
            <span className={`material-symbols-outlined scale-75 cngcolor ${mode==="profile" ? "text-green-600":"text-white"}`}>account_circle</span>
            <span className='block mt-1'>Profile</span>
          </button>
        </div>

        <div className='w-full'>
          {mode === 'web' && <SearchWeb />}
          {mode === 'collection' && <SearchCollection />}
          {mode === 'profile' && <SearchUser />}
        </div>
      </div>
    </MainContainer>
  )
}
