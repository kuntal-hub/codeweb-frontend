import React,{useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { webService } from '../apiServices/web'
import Iframe from '../components/webComponents/Iframe'
import RetroBG from "../components/backgrounds/RetroBG"

export default function ViewFullWeb() {
    const { webId } = useParams()
    const [web,setWeb] = useState(null)
    const navigate = useNavigate()
    document.title = web ? web.title : "Loading..."

    useEffect(() => {
        if (!webId) {
            navigate('/404')
        }

        webService.getWebWithoutDteailsById({webId})
        .then(res => {
            if (res.status<400 && res.data) {
                setWeb(res.data)
            } else {
                navigate('/404')
            }
        })

    }, [webId])

  return (
    web ?
    <div className='w-screen h-screen fixed top-0 left-0 m-0 p-0 overflow-auto bg-white'>
        <Iframe web={web} />
    </div> : <RetroBG text={"Loading..."} />
  )
}
