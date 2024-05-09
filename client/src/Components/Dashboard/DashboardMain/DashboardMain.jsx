import React, { useEffect, useState } from "react";
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import UpdateProfile from "../User/UpdateProfile/UpdateProfile";
import ChangePassword from "../User/ChangePassword/ChangePassword";
import PostSection from "../User/PostSection/PostSection";
import Subscription from "../User/Subscription/Subscription";
import DeleteUserAccount from "../User/DeleteUserAccount/DeleteUserAccount";
import ChangeEmail from "../User/UpdateProfile/ChangeEmail/ChangeEmail";
import ApartmentIcon from '@mui/icons-material/Apartment';
import "./DashboardMain.css";
import TopBar from "./TopBar";
import ManageHostels from "../ManageHostels/ManageHostels";
import BasicInformation from "../ManageHostels/BasicInformation/BasicInformation";
import Facilities from "../ManageHostels/Facilities/Facilities";
import TypeAndContact from "../ManageHostels/Type&Contact/TypeAndContact";
import Charges from "../ManageHostels/RoomCharges/Charges";
import ManualAddress from "../ManageHostels/ManualAddress/ManualAddress";
import UpdateImages from "../ManageHostels/UpdateImages/UpdateImages";
import { useSelector } from "react-redux";
import { oneOwnerHostels } from "../../../features/hostel/registerHostelSlice";
import { useDispatch } from "react-redux";
import { allMyHostels } from "../../../features/hostel/registerHostelSlice";
// const arr = ["Pak Boys Hostel", "Girls Hostel"];

const DashboardMain = ({ name }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(name);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [specificData, setSpecificData ] = useState(null);

  useEffect(()=>{
    dispatch(allMyHostels());
  },[setActive, setSelectedHostel])

  const oneOwnerHostel = useSelector((state)=> oneOwnerHostels(state.hostel));
  // const arr = oneOwnerHostel?.map(obj => obj.name)
 
  return (
    <>
      <TopBar name={active} />
      <div className="dashboardBackground" >
        <div className="sideDash">
          <h4 className="brandName">Hostify.pk</h4>
          <hr className="brandNameLine" />
          <div className="sideDashLinksDiv">
            <div className={`sideDashLinks ${(active === "Update Profile" || active === "Change Password" || active === "Change Email/Ph") && "dashActive"}`} onClick={() => { setActive("Update Profile")}}><FolderSharedIcon id="sideDashLinksIco" />Update Profile</div>
            {
              (active === "Update Profile" || active === "Change Password" || active === "Change Email/Ph") && (
                <div className="dashboardOptionsDiv">
                  <div className={`dashboardOptions ${active === "Change Password" && "dashboardActive"}`} onClick={() => setActive("Change Password")}>- Change Password</div>
                  <div className={`dashboardOptions ${active === "Change Email/Ph" && "dashboardActive"}`} onClick={() => setActive("Change Email/Ph")}>- Change Email/Ph</div>        
                </div>
              )
            }
            
            <div className={`sideDashLinks ${(active === "Manage Hostels" || active === "Basic Information" || active === "Type & Contact" || active === "Facilities & Rules" || active === "Charges" || active === "Address" || active === "Images" ) && "dashActive"}`} onClick={() => setActive("Manage Hostels")}><ApartmentIcon id="sideDashLinksIco" />Manage Hostels</div>     
            
            {(active === "Manage Hostels" || active === "Basic Information" || active === "Type & Contact" || active === "Facilities & Rules" || active === "Charges" || active === "Address" || active === "Images" ) &&
             <div className="dashboardOptionsDiv">
              {(oneOwnerHostel.length > 0) && oneOwnerHostel.map((hostel, index) => (
              <React.Fragment key={index}>
                <div className="dashboardOptions">
                  <div className="dashboardOptionsBold" onClick={() => {setSelectedHostel(selectedHostel === hostel.title ? null : hostel.title); setSpecificData(hostel); setActive("Manage Hostels")}}>- {hostel.title}</div>
                </div>
                {selectedHostel === hostel.title && (
                  <div >
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Basic Information" && "dashboardActive"}`} onClick={() => setActive("Basic Information")}>Basic Information</div>
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Type & Contact" && "dashboardActive"}`} onClick={() => setActive("Type & Contact")}>Type & Contact</div>
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Facilities & Rules" && "dashboardActive"}`} onClick={() => setActive("Facilities & Rules")}>Facilities & Rules</div>
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Charges" && "dashboardActive"}`} onClick={() => setActive("Charges")}>Charges</div>
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Address" && "dashboardActive"}`} onClick={() => setActive("Address")}>Address</div> 
                    <div className={`dashboardOptions dashboardOptionsSidePadding ${active === "Images" && "dashboardActive"}`} onClick={() => setActive("Images")}>Images</div> 
                  </div>
                )}
              </React.Fragment>
            ))}</div>}
            
            <div className={`sideDashLinks ${active === "Posts Section" && "dashActive"}`} onClick={() => setActive("Posts Section")}><FeaturedVideoIcon id="sideDashLinksIco" />Posts Section</div>
            <div className={`sideDashLinks ${active === "Subscription" && "dashActive"}`} onClick={() => setActive("Subscription")}><FavoriteIcon id="sideDashLinksIco" />Subscription</div>
            <div className={`sideDashLinks ${active === "Delete Account" && "dashActive"}`} onClick={() => setActive("Delete Account")}><PersonRemoveIcon id="sideDashLinksIco" />Delete Account</div>
          </div>
        </div>
      </div>
      {active === "Update Profile" && <UpdateProfile />}
      {active === "Change Password" && <ChangePassword />}
      {active === "Change Email/Ph" && <ChangeEmail />}
      {active === "Manage Hostels" && <ManageHostels />}
      {active === "Posts Section" && <PostSection />}
      {active === "Subscription" && <Subscription />}
      {active === "Delete Account" && <DeleteUserAccount />}
      {/* Manage Hostel Routes */}
      {active === "Basic Information" && <BasicInformation data={specificData}/>}
      {active === "Facilities & Rules" && <Facilities  data={specificData}/>}
      {active === "Type & Contact" && <TypeAndContact  data={specificData}/>}
      {active === "Charges" && <Charges  data={specificData}/>}
      {active === "Address" && <ManualAddress  data={specificData}/>}
      {active === "Images" && <UpdateImages  data={specificData}/>}



    </>
  )
}

export default DashboardMain