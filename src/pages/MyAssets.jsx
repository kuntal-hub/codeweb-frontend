import React, { useState, useEffect } from "react";
import CreateAudioAsset from "../components/assetComponents/CreateAudioAsset";
import CreateImageAsset from "../components/assetComponents/CreateImageAsset";
import CreateVideoAsset from "../components/assetComponents/CreateVideoAsset";
import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";
import { assetService } from "../apiServices/asset";
import ShowMyImageAssets from "../components/assetComponents/ShowMyImageAssets";
import ShowMyVideoAssets from "../components/assetComponents/ShowMyVideoAssets";
import ShowMyAudioAssets from "../components/assetComponents/ShowMyAudioAssets";
import "../cssFiles/assetCards.css";

export default function MyAssets() {
  const [assetType, setAssetType] = useState('image');
  const [isCreateAudioAssetRendering, setIsCreateAudioAssetRendering] = useState(false);
  const [isCreateImageAssetRendering, setIsCreateImageAssetRendering] = useState(false);
  const [isCreateVideoAssetRendering, setIsCreateVideoAssetRendering] = useState(false);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imgCol1, setImgCol1] = useState([]);
  const [imgCol2, setImgCol2] = useState([]);
  const [imgCol3, setImgCol3] = useState([]);
  const [imgCol4, setImgCol4] = useState([]);
  const [imgCurrentPage, setImgCurrentPage] = useState(1);
  const [videoCurrentPage, setVideoCurrentPage] = useState(1);
  const [audioCurrentPage, setAudioCurrentPage] = useState(1);
  const [imageResData, setImagesResData] = useState(null);
  const [videoResData, setVideosResData] = useState(null);
  const [audioResData, setAudiosResData] = useState(null);
  const dispatch = useDispatch();

  const renderCreateAsset = () => {
    setIsCreateAudioAssetRendering(false);
    setIsCreateImageAssetRendering(false);
    setIsCreateVideoAssetRendering(false);
    if (assetType === "image") {
      return setIsCreateImageAssetRendering(true);
    } else if (assetType === "video") {
      return setIsCreateVideoAssetRendering(true);
    } else if (assetType === "audio") {
      return setIsCreateAudioAssetRendering(true);
    }
  }

  const setImages = () => {
    let arr = [imgCol1.length, imgCol2.length, imgCol3.length, imgCol4.length]

    arr.sort();

    if (imgCol1.length === arr[0]) {
      return setImgCol1;
    } else if (imgCol2.length === arr[0]) {
      return setImgCol2;
    } else if (imgCol3.length === arr[0]) {
      return setImgCol3;
    } else if (imgCol4.length === arr[0]) {
      return setImgCol4;
    } else {
      return setImgCol1;
    }
  }

  function spliteArr(mainArr) {

    if (!mainArr || mainArr.length === 0) return [[], [], [], []];

    const divisionCount = Math.floor(mainArr.length / 4);
    let arr1, arr2, arr3, arr4;
    const extraArr = mainArr.slice(divisionCount * 4, mainArr.length);
    const lengtArr = [imgCol1.length, imgCol2.length, imgCol3.length, imgCol4.length]
    lengtArr.sort();
    arr1 = mainArr.slice(0, divisionCount);
    arr2 = mainArr.slice(divisionCount, divisionCount * 2);
    arr3 = mainArr.slice(divisionCount * 2, divisionCount * 3);
    arr4 = mainArr.slice(divisionCount * 3, divisionCount * 4);
    if (extraArr.length === 1) {
      if (imgCol1.length === lengtArr[0]) {
        arr1.push(extraArr[0]);
      } else if (imgCol2.length === lengtArr[0]) {
        arr2.push(extraArr[0]);
      } else if (imgCol3.length === lengtArr[0]) {
        arr3.push(extraArr[0]);
      } else if (imgCol4.length === lengtArr[0]) {
        arr4.push(extraArr[0]);
      }
    } else if (extraArr.length === 2) {
      if ((imgCol1.length === lengtArr[0] || lengtArr[1]) && (imgCol2.length === lengtArr[0] || lengtArr[1])) {
        arr1.push(extraArr[0]);
        arr2.push(extraArr[1]);
      } else if ((imgCol1.length === lengtArr[0] || lengtArr[1]) && (imgCol3.length === lengtArr[0] || lengtArr[1])) {
        arr1.push(extraArr[0]);
        arr3.push(extraArr[1]);
      } else if ((imgCol1.length === lengtArr[0] || lengtArr[1]) && (imgCol4.length === lengtArr[0] || lengtArr[1])) {
        arr1.push(extraArr[0]);
        arr4.push(extraArr[1]);
      } else if ((imgCol2.length === lengtArr[0] || lengtArr[1]) && (imgCol3.length === lengtArr[0] || lengtArr[1])) {
        arr2.push(extraArr[0]);
        arr3.push(extraArr[1]);
      } else if ((imgCol2.length === lengtArr[0] || lengtArr[1]) && (imgCol4.length === lengtArr[0] || lengtArr[1])) {
        arr2.push(extraArr[0]);
        arr4.push(extraArr[1]);
      } else if ((imgCol3.length === lengtArr[0] || lengtArr[1]) && (imgCol4.length === lengtArr[0] || lengtArr[1])) {
        arr3.push(extraArr[0]);
        arr4.push(extraArr[1]);
      }
    } else if (extraArr.length === 3) {
      if (imgCol1.length === lengtArr[3]) {
        arr2.push(extraArr[0]);
        arr3.push(extraArr[1]);
        arr4.push(extraArr[2]);
      } else if (imgCol2.length === lengtArr[3]) {
        arr1.push(extraArr[0]);
        arr3.push(extraArr[1]);
        arr4.push(extraArr[2]);
      } else if (imgCol3.length === lengtArr[3]) {
        arr1.push(extraArr[0]);
        arr2.push(extraArr[1]);
        arr4.push(extraArr[2]);
      } else if (imgCol4.length === lengtArr[3]) {
        arr1.push(extraArr[0]);
        arr2.push(extraArr[1]);
        arr3.push(extraArr[2]);
      }
    }
    return [arr1, arr2, arr3, arr4]
  }

  const getImageAssets = async (page) => {
    const limit = 20;
    const response = await assetService.getMyAssets({ assetType: "image", page: page, limit })
    if (response.status < 400 && response.data) {
      setImagesResData(response.data)
      const arrayLists = spliteArr(response.data.docs);
      if (page === 1) {
        setImgCol1(arrayLists[0])
        setImgCol2(arrayLists[1])
        setImgCol3(arrayLists[2])
        setImgCol4(arrayLists[3])
      } else {
        setImgCol1([...imgCol1, ...arrayLists[0]])
        setImgCol2([...imgCol2, ...arrayLists[1]])
        setImgCol3([...imgCol3, ...arrayLists[2]])
        setImgCol4([...imgCol4, ...arrayLists[3]])
      }
      setImgCurrentPage(page)
    } else {
      dispatch(addNotification({ type: "error", text: response.message }))
    }
  }

  const getVideoAssets = async (page) => {
    const limit = 8;
    const response = await assetService.getMyAssets({ assetType: "video", page: page, limit })
    if (response.status < 400 && response.data) {
      setVideosResData(response.data)
      if (page === 1) {
        setVideos(response.data.docs)
      } else {
        setVideos([...videos, ...response.data.docs])
      }
      setVideoCurrentPage(page)
    } else {
      dispatch(addNotification({ type: "error", text: response.message }))
    }
  }

  const getAudioAssets = async (page) => {
    const limit = 20;
    const response = await assetService.getMyAssets({ assetType: "audio", page: page, limit })
    if (response.status < 400 && response.data) {
      setAudiosResData(response.data)
      if (page === 1) {
        setAudios(response.data.docs)
      } else {
        setAudios([...audios, ...response.data.docs])
      }
      setAudioCurrentPage(page)
    } else {
      dispatch(addNotification({ type: "error", text: response.message }))
    }
  }

  useEffect(() => {
    if (assetType === "image") {
      document.title = "codeweb - My Image Assets"
      if (imgCol1.length + imgCol2.length + imgCol3.length + imgCol4.length !== 0) return;
      // console.log("image")
      getImageAssets(1)
    } else if (assetType === "video") {
      document.title = "codeweb - My Video Assets"
      if (videos.length !== 0) return;
      // console.log("video")
      getVideoAssets(1)
    } else if (assetType === "audio") {
      document.title = "codeweb - My Audio Assets"
      if (audios.length !== 0) return;
      // console.log("audio")
      getAudioAssets(1)
    }
  }, [assetType])

  return (
    <div className="w-full h-full overflow-auto bg-gray-950 pb-24 text-white">
      <div className='px-2 md:px-4 flex flex-nowrap justify-between pt-2'>
        <div>
          <button onClick={() => setAssetType("image")}
            className={`rounded-md ${assetType === "image" ? "bg-green-500" : "bg-gray-700"} px-2 text-[14px] font-semibold mx-1 py-1`}>
            Image
          </button>
          <button onClick={() => setAssetType("video")}
            className={`rounded-md ${assetType === "video" ? "bg-green-500" : "bg-gray-700"} px-2 text-[14px] font-semibold mx-1 py-1`}>
            Video
          </button>
          <button onClick={() => setAssetType("audio")}
            className={`rounded-md ${assetType === "audio" ? "bg-green-500" : "bg-gray-700"} px-2 text-[14px] font-semibold mx-1 py-1`}>
            Audio
          </button>
        </div>
        <button onClick={renderCreateAsset}
          className=' bg-green-600 hover:bg-green-600 font-semibold py-2 px-5 rounded-lg'>
          Create
        </button>
      </div>

      {assetType === "image" ? 
      <ShowMyImageAssets
      imageResData={imageResData}
      imgCol1={imgCol1}
      imgCol2={imgCol2}
      imgCol3={imgCol3}
      imgCol4={imgCol4}
      imgCurrentPage={imgCurrentPage}
      getImageAssets={getImageAssets}
      /> : assetType === "video" ? 
      <ShowMyVideoAssets
      videoCurrentPage={videoCurrentPage}
      videoResData={videoResData}
      videos={videos}
      getVideoAssets={getVideoAssets}
      /> : 
      <ShowMyAudioAssets
      audioCurrentPage={audioCurrentPage}
      audioResData={audioResData}
      audios={audios}
      getAudioAssets={getAudioAssets}
      
      />}

      {isCreateAudioAssetRendering &&
        <CreateAudioAsset
          setAudios={setAudios}
          isCreateAudioAssetRendering={isCreateAudioAssetRendering}
          setIsCreateAudioAssetRendering={setIsCreateAudioAssetRendering}
        />}
      {isCreateImageAssetRendering &&
        <CreateImageAsset
          setImages={setImages()}
          isCreateImageAssetRendering={isCreateImageAssetRendering}
          setIsCreateImageAssetRendering={setIsCreateImageAssetRendering}
        />}
      {isCreateVideoAssetRendering &&
        <CreateVideoAsset
          setVideos={setVideos}
          isCreateVideoAssetRendering={isCreateVideoAssetRendering}
          setIsCreateVideoAssetRendering={setIsCreateVideoAssetRendering}
        />}
    </div>
  )
}
