import React,{useState,useEffect} from 'react'
import ShowMyImageAssets from '../assetComponents/ShowMyImageAssets'
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';
import { assetService } from '../../apiServices/asset';
import "../../cssFiles/assetCards.css";

export default function Images() {
    const [imageResData, setImagesResData] = useState(null);
    const [imgCol1, setImgCol1] = useState([]);
    const [imgCol2, setImgCol2] = useState([]);
    const [imgCol3, setImgCol3] = useState([]);
    const [imgCol4, setImgCol4] = useState([]);
    const [imgCurrentPage, setImgCurrentPage] = useState(1);
    const dispatch = useDispatch();
    
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
        const response = await assetService.getAllPublicAssets({assetType: 'image', page, limit})
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

        useEffect(() => {
            getImageAssets(1)
        }, [])

  return (
    <div className='w-full h-full-50px rounded-b-lg px-2'>
        <ShowMyImageAssets 
            imgCol1={imgCol1} 
            imgCol2={imgCol2} 
            imgCol3={imgCol3} 
            imgCol4={imgCol4} 
            imgCurrentPage={imgCurrentPage} 
            imageResData={imageResData} 
            getImageAssets={getImageAssets}
            height={window.innerHeight - 112}
            copyOnly={true}
        />
    </div>
  )
}
