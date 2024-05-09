import React, { useEffect, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { hostelImagesData, hLoading } from '../../../../features/hostel/registerHostelSlice';
import { useDispatch, useSelector } from "react-redux";
import "./UpdateImages.css";
const imgArr = ['img1', 'img2', 'img3', 'img4'];

const HImages = ({ name, data}) => {
  const dispatch = useDispatch();
  const imgUploading = useSelector((state) => hLoading(state.hostel));

  const [selectedImages, setSelectedImages] = useState([]);
  let url1 = "", url2= "", url3= "", url4= "";
  
    if(data.hostelImages.length === 1){
      url1 = data?.hostelImages[0]?.path;
    }else if(data.hostelImages.length === 2){
      url1 = data?.hostelImages[0]?.path;
      url2 = data?.hostelImages[1]?.path;
  
    }else if(data.hostelImages.length === 3){
      url1 = data?.hostelImages[0]?.path;
      url2 = data?.hostelImages[1]?.path;
      url3 = data?.hostelImages[2]?.path;
  
    }else if(data.hostelImages.length === 4){
      url1 = data?.hostelImages[0]?.path;
      url2 = data?.hostelImages[1]?.path;
      url3 = data?.hostelImages[2]?.path;
      url4 = data?.hostelImages[3]?.path;
    }
 
  const [previewURLs, setPreviewURLs] = useState({ img1: url1 , img2: url2, img3: url3, img4: url4 });
  const [notSelected, setNotSelected] = useState(false)

  const handleImgClick = (identifier) => {
    document.getElementById(identifier).click();
  }

  const handleImageUpload = (e, identifier) => {
    const data = e.target.files[0];
    setNotSelected(false)
    setPreviewURLs(prevState => ({
      ...prevState,
      [identifier]: URL.createObjectURL(data)
    }))
    setSelectedImages(prevState => ({
      ...prevState,
      [identifier]: data
    }))
  }

  const uploadImages = () => {
    if (selectedImages.length === 0) {
      setNotSelected(true)
    } else {
      const form = new FormData();
      Object.values(selectedImages).map(image => {
        form.append('hostelPics', image)
        // handleNext()
        // for(let i of form){
        //   console.log(i)
        // }
      })
    }
  }

  return (
    <div className='HMainDiv updateImagesMianDiv'>
      {/* <span className="IHeading">Upload Your {name} Images:</span> */}
      {/* <h6 className={`ImagesInfo ${!notSelected ? null : "ImagesInfoError"}`}><InfoIcon id="infoIco" /> {!notSelected ? null : "( Please Select atleast one img )"} 1st image will be displayed as main image</h6> */}
      <div className='HImagesDiv'>
        {
          imgArr.map((imgNo) => (
            <React.Fragment key={imgNo}>
              <input
                type="file"
                id={imgNo}
                onChange={(e) => handleImageUpload(e, imgNo)}
                hidden
              />
              <img className={`HImage ${!notSelected ? null : "HImagesError"}`} src={(previewURLs[imgNo] !== "") ? previewURLs[imgNo] : "/images/img-upload.png"} onClick={() => handleImgClick(imgNo)} />
            </React.Fragment>
          ))
        }
      </div>
      <div className='updateBtnDiv'><button className='updateBtn' type='submit'>Update</button></div>
      
    </div>
  )
}

export default HImages