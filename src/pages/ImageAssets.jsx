import React,{useState,useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateImageAsset from '../components/assetComponents/CreateImageAsset';
import { assetService } from '../apiServices/asset';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import ImageAssetCard from '../components/assetComponents/ImageAssetCard';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../cssFiles/assetCards.css";

export default function ImageAssets() {
    const [colum1, setColum1] = useState([])
    const [colum2, setColum2] = useState([])
    const [colum3, setColum3] = useState([])
    const [colum4, setColum4] = useState([])
    const [resData, setResData] = useState(null)
    const [isCreateImageAssetRendering, setIsCreateImageAssetRendering] = useState(false)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const urlParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    document.title = "codeweb - Image Assets"

    const setImages = () =>{
        let arr = [colum1.length, colum2.length, colum3.length, colum4.length]

        arr.sort();

        if (colum1.length === arr[0]) {
            return setColum1;
        } else if(colum2.length === arr[0]){
            return setColum2;
        } else if(colum3.length === arr[0]){
            return setColum3;
        } else if(colum4.length === arr[0]){
            return setColum4;
        } else {
            return setColum1;
        }
    }

    function spliteArr(mainArr){

        if (!mainArr || mainArr.length === 0) return [[],[],[],[]];

        const divisionCount = Math.floor(mainArr.length/4);
        let arr1,arr2,arr3,arr4;
        const extraArr = mainArr.slice(divisionCount*4,mainArr.length);
        const lengtArr = [colum1.length, colum2.length, colum3.length, colum4.length]
        lengtArr.sort();
        arr1 = mainArr.slice(0,divisionCount);
        arr2 = mainArr.slice(divisionCount,divisionCount*2);
        arr3 = mainArr.slice(divisionCount*2,divisionCount*3);
        arr4 = mainArr.slice(divisionCount*3,divisionCount*4);
        if(extraArr.length === 1){
            if (colum1.length === lengtArr[0]) {
                arr1.push(extraArr[0]);
            } else if(colum2.length === lengtArr[0]){
                arr2.push(extraArr[0]);
            } else if(colum3.length === lengtArr[0]){
                arr3.push(extraArr[0]);
            } else if(colum4.length === lengtArr[0]){
                arr4.push(extraArr[0]);
            }
        } else if(extraArr.length === 2){
            if ((colum1.length === lengtArr[0] || lengtArr[1]) && (colum2.length === lengtArr[0] || lengtArr[1])) {
                arr1.push(extraArr[0]);
                arr2.push(extraArr[1]);
            } else if((colum1.length === lengtArr[0] || lengtArr[1]) && (colum3.length === lengtArr[0] || lengtArr[1])){
                arr1.push(extraArr[0]);
                arr3.push(extraArr[1]);
            } else if((colum1.length === lengtArr[0] || lengtArr[1]) && (colum4.length === lengtArr[0] || lengtArr[1])){
                arr1.push(extraArr[0]);
                arr4.push(extraArr[1]);
            } else if((colum2.length === lengtArr[0] || lengtArr[1]) && (colum3.length === lengtArr[0] || lengtArr[1])){
                arr2.push(extraArr[0]);
                arr3.push(extraArr[1]);
            } else if((colum2.length === lengtArr[0] || lengtArr[1]) && (colum4.length === lengtArr[0] || lengtArr[1])){
                arr2.push(extraArr[0]);
                arr4.push(extraArr[1]);
            } else if((colum3.length === lengtArr[0] || lengtArr[1]) && (colum4.length === lengtArr[0] || lengtArr[1])){
                arr3.push(extraArr[0]);
                arr4.push(extraArr[1]);
            } 
        } else if(extraArr.length === 3){
          if (colum1.length === lengtArr[3]) {
            arr2.push(extraArr[0]);
            arr3.push(extraArr[1]);
            arr4.push(extraArr[2]);
          } else if(colum2.length === lengtArr[3]){
            arr1.push(extraArr[0]);
            arr3.push(extraArr[1]);
            arr4.push(extraArr[2]);
          } else if(colum3.length === lengtArr[3]){
            arr1.push(extraArr[0]);
            arr2.push(extraArr[1]);
            arr4.push(extraArr[2]);
          } else if(colum4.length === lengtArr[3]){
            arr1.push(extraArr[0]);
            arr2.push(extraArr[1]);
            arr3.push(extraArr[2]);
          }
        }
        return [arr1,arr2,arr3,arr4]
    }

    const getPublicAssets = async (page) => {
        const limit = 20;
        if (!urlParams.has('query') || urlParams.get('query').trim() === "") {
            const response = await assetService.getAllPublicAssets({assetType:"image",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                const arrayLists = spliteArr(response.data.docs);
                if (page === 1) {
                    setColum1(arrayLists[0])
                    setColum2(arrayLists[1])
                    setColum3(arrayLists[2])
                    setColum4(arrayLists[3])
                } else {
                    setColum1([...colum1,...arrayLists[0]])
                    setColum2([...colum2,...arrayLists[1]])
                    setColum3([...colum3,...arrayLists[2]])
                    setColum4([...colum4,...arrayLists[3]])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }else{
            const response = await assetService.searchFromPublicAssets({search:urlParams.get('query'),assetType:"image",page:page,limit})
            if (response.status < 400 && response.data) {
                setResData(response.data)
                const arrayLists = spliteArr(response.data.docs);
                if (page === 1) {
                    setColum1(arrayLists[0])
                    setColum2(arrayLists[1])
                    setColum3(arrayLists[2])
                    setColum4(arrayLists[3])
                } else {
                    setColum1([...colum1,...arrayLists[0]])
                    setColum2([...colum2,...arrayLists[1]])
                    setColum3([...colum3,...arrayLists[2]])
                    setColum4([...colum4,...arrayLists[3]])
                }
                setPage(page)
            } else{
                dispatch(addNotification({type:"error",text:response.message}))
            }
        }
    }

    const search = (data) => {
        const search = data.search.trim().replaceAll(" ","+")
        if (data.search.trim() === "") {
            return navigate(`/assets/images`)
        }
        navigate(`/assets/images?query=${search}`)
    }

    useEffect(() => {
        getPublicAssets(1)
    }, [urlParams.get('query')])

  return (
    <div className='w-full h-full overflow-auto bg-gray-950 pb-24'>
        <div className='px-4 md:px-8 flex flex-nowrap justify-between py-2'>
            <div>
                <form onSubmit={handleSubmit(search)} className='flex flex-nowrap justify-start'>
                    <label
                    className='material-symbols-outlined text-white bg-gray-700 h-10 pt-2 px-3 rounded-l-full cursor-pointer'
                    htmlFor='searchImageAssets'
                    >search</label>
                    <input 
                    type="search"
                    id='searchImageAssets'
                    defaultValue={urlParams.get('query') ? urlParams.get('query') : "" }
                    placeholder='Search Images'
                    {...register('search')}
                    className='h-10 py-1 px-3 bg-gray-700 text-white font-semibold rounded-r-full sm:w-96 lg:w-[450px]'
                    />
                </form>
            </div>
            <button onClick={()=>setIsCreateImageAssetRendering(true)}
            className=' bg-green-600 hover:bg-green-600 font-semibold py-2 px-5 rounded-lg'>
                Create
            </button>
        </div>

        {
            resData ? (colum1.length + colum2.length + colum3.length + colum4.length) > 0 ?
            <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={colum1.length + colum2.length + colum3.length + colum4.length}
            next={()=>getPublicAssets(page+1)}
            height={window.innerWidth<1024 ? window.innerHeight-166 : window.innerHeight-112}
            hasMore={resData.hasNextPage}
            loader={<h4 className='w-full text-center font-bold text-lg'>Loading...</h4>}
            endMessage={
              <p className='w-full text-center font-semibold my-4'>No More Data</p>
            }
            >
        <div className="row"> 
        <div className="column">
            {colum1.map((image,index) => <ImageAssetCard key={index} image={image} getPublicAssets={getPublicAssets} />)}
        </div>
        <div className="column">
            {colum2.map((image,index) => <ImageAssetCard key={index} image={image} getPublicAssets={getPublicAssets} />)}
        </div>  
        <div className="column">
            {colum3.map((image,index) => <ImageAssetCard key={index} image={image} getPublicAssets={getPublicAssets} />)}
        </div>
        <div className="column">
            {colum4.map((image,index) => <ImageAssetCard key={index} image={image} getPublicAssets={getPublicAssets} />)}
        </div>
      </div>
            </InfiniteScroll> : 
            <h1 className='text-center font-bold text-2xl text-white mt-32'>😵 No Images Found</h1> :
            <h1 className='text-center font-bold text-2xl text-white mt-32'>Loading...</h1>
        }

        {isCreateImageAssetRendering && <CreateImageAsset 
        isCreateImageAssetRendering={isCreateImageAssetRendering}
        setIsCreateImageAssetRendering={setIsCreateImageAssetRendering}
        setImages={setImages()} />}
    </div>
  )
}
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_grid_responsive