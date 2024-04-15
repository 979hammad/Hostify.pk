import React, { useState } from "react";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "./DashboardMain.css";
import UpdateProfile from "../User/UpdateProfile/UpdateProfile";
import ChangePassword from "../User/ChangePassword/ChangePassword";
import PostSection from "../User/PostSection/PostSection";
import Subscription from "../User/Subscription/Subscription";
import DeleteUserAccount from "../User/DeleteUserAccount/DeleteUserAccount";
import TopBar from "./TopBar";

const DashboardMain = ({name}) => {
  const [active, setActive] = useState(name);
  
  return (
    <>
     <TopBar name={active}/>
     <div className="dashboardBackground" >
     <div className="sideDash">
        <h4 className="brandName">Hostify.pk</h4>
        <hr className="brandNameLine"/>
      <div className="sideDashLinksDiv">
        <div className={`sideDashLinks ${active === "Update Profile" && "dashActive" }`} onClick={()=>{setActive("Update Profile"); }}><FolderSharedIcon id="sideDashLinksIco"/>Update Profile</div>
        <div className={`sideDashLinks ${active === "Change Password" && "dashActive" }`} onClick={()=>setActive("Change Password")}><VpnKeyIcon id="sideDashLinksIco" />Change Password</div>
        <div className={`sideDashLinks ${active === "Posts Section" && "dashActive" }`} onClick={()=>setActive("Posts Section")}><FeaturedVideoIcon id="sideDashLinksIco" />Posts Section</div>
        <div className={`sideDashLinks ${active === "Subscription" && "dashActive" }`}  onClick={()=>setActive("Subscription")}><FavoriteIcon id="sideDashLinksIco" />Subscription</div>
        <div className={`sideDashLinks ${active === "Delete Account" && "dashActive" }`} onClick={()=>setActive("Delete Account")}><PersonRemoveIcon id="sideDashLinksIco" />Delete Account</div>
      </div>
     </div>
     </div>
     { active === "Update Profile" && <UpdateProfile /> }
     { active === "Change Password" && <ChangePassword /> }
     { active === "Posts Section" && <PostSection /> }
     { active === "Subscription" && <Subscription /> }
     { active === "Delete Account" && <DeleteUserAccount /> }
    </>
  )
}

export default DashboardMain