import React from 'react';
import Avatar from '@mui/material/Avatar';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import "./AboutOwner.css";

const AboutOwner = ({hostelOwner}) => {
  return (
    <>
     <div className='aboutOwnerDiv'>
      <p className='ownerTag'>Owner</p>
      <Avatar id="hostelDetailOwnerAvtar" sx={{backgroundColor: "white" }}>N</Avatar>
      <p>{hostelOwner.fName} {hostelOwner.lName}</p>
      <div className='hostelDetailIconsDiv'>
        {hostelOwner.HcontactNoW && <WhatsAppIcon id="hostelDetailOIcons" onClick={()=>window.open(`https://wa.me/+92${hostelOwner.HcontactNoW}`, '_blank')}/>}
        <PhoneAndroidIcon id="hostelDetailOIcons" onClick={()=> window.open(`tel:+92${hostelOwner.HcontactNoP}`)}/>
      </div>
     </div>
    </>
  )
}

export default AboutOwner