import React, {useState} from 'react';
import { DisplayHostelDetailImage } from '../../../../assets/DialogueAssets';
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import "./HostelDetailImage.css";

const HostelDetailImage = ({hostelImages}) => {
  const [openHostelDetailImage, setOpenHostelDetailImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  return (
    <>
    <div className='hostelDetailImageMainDiv'>
       <div>
       {hostelImages[0]?.path && <img className='hostelDetailMainImg' onClick={()=> {setOpenHostelDetailImage(true); setPreviewImage(hostelImages[0]?.path)}} src={hostelImages[0]?.path}/>}
       </div>
       <div className='hostelDetailSideImagesDiv'>
        {hostelImages[0]?.path &&  <img className='hostelDetailSideImages' onClick={()=> {setOpenHostelDetailImage(true); setPreviewImage(hostelImages[0]?.path)}} src={hostelImages[0]?.path}/>}
        {hostelImages[1]?.path &&  <img className='hostelDetailSideImages' onClick={()=> {setOpenHostelDetailImage(true); setPreviewImage(hostelImages[0]?.path)}} src={hostelImages[1]?.path}/>}
        {hostelImages[2]?.path &&  <img className='hostelDetailSideImages' onClick={()=> {setOpenHostelDetailImage(true); setPreviewImage(hostelImages[0]?.path)}} src={hostelImages[2]?.path}/>}
        {hostelImages[3]?.path &&  <img className='hostelDetailSideImages' onClick={()=> {setOpenHostelDetailImage(true); setPreviewImage(hostelImages[0]?.path)}} src={hostelImages[3]?.path}/>}
       </div>
    </div>
    <DisplayHostelDetailImage
    fullWidth={true}
    maxWidth="md"
    id="displayHostelDetailImage"
    onClose={()=> setOpenHostelDetailImage(false)}
    open={openHostelDetailImage}
  >
    <IconButton
      aria-label="close"
      onClick={() => setOpenHostelDetailImage(false)}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
     <img className='previewImage' src={previewImage}/>
    </DisplayHostelDetailImage> 
    </>
  )
}

export default HostelDetailImage