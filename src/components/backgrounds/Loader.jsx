import React,{useEffect,useState} from 'react'

export default function Loader({texts=["Loading...","Please wait","Loading...", "Please wait..."]}) {
    const [text,setText] = useState(texts[0])
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(texts[i])
            i = (i+1) % texts.length
        }, 1500);
        return () => clearInterval(interval)
    },[texts])
  return (
    <div className='half_transparent w-screen h-screen fixed top-0 left-0 z-40 grid place-content-center'>
        <p className='text-white text-3xl md:text-[40px] text-center font-bold font-serif'>
            {text}
        </p>
    </div>
  )
}
