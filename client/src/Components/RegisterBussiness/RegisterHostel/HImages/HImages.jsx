import React, { useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { hostelImagesData, hLoading } from '../../../../features/hostel/registerHostelSlice';
import { useDispatch, useSelector } from "react-redux";
import "./HImages.css";
const imgArr = ['img1', 'img2', 'img3', 'img4'];

const HImages = ({ name, handleNext }) => {
  const dispatch = useDispatch();
  const imgUploading = useSelector((state) => hLoading(state.hostel));

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState({ img1: "", img2: "", img3: "", img4: "" });
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
        dispatch(hostelImagesData(form))
        // handleNext()
        // for(let i of form){
        //   console.log(i)
        // }
      })
    }
  }

  return (
    <div className='HMainDiv'>
      <span className="IHeading">Upload Your {name} Images:</span>
      <h6 className={`ImagesInfo ${!notSelected ? null : "ImagesInfoError"}`}><InfoIcon id="infoIco" /> {!notSelected ? null : "( Please Select atleast one img )"} 1st image will be displayed as main image</h6>
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
      {imgUploading === "idle" && (
        <Button id="stepperNextBtns" variant="contained" onClick={uploadImages}>Upload</Button>
      )}
      {imgUploading === "pending" && (
        <Button id="stepperNextBtns" variant="contained" >Uploading...</Button>
      )}
      {imgUploading === "success" && (
        <Button id="stepperNextBtns" variant="contained" onClick={()=>handleNext()}>Next</Button>
      )}
    </div>
  )
}

export default HImages