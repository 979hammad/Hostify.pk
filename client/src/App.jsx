import Home from "./Components/Home/Home.jsx";
import RegisterHostel from "./Components/RegisterBussiness/RegisterHostel/RegisterHostel.jsx";
import RegisterMess from "./Components/RegisterBussiness/RegisterMess/RegisterMess.jsx";
import Feeds from "./Components/Feeds/Feeds.jsx";
import AllMess from "./Components/AllMess/AllMess.jsx";
import AllHostels from "./Components/AllHostels/AllHostels.jsx";
import HostelDetail from "./Components/AllHostels/HostelDetail/HostelDetail.jsx";
import SelectBussiness from "./Components/RegisterBussiness/SelectBussiness/SelectBussiness.jsx";
import DashboardMain from "./Components/Dashboard/DashboardMain/DashboardMain.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "./features/auth/userAuthSlice.js";
import "./App.css";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token");

  
  useEffect(()=>{
    dispatch(loginWithGoogle())
  })

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectbussiness" element={<SelectBussiness />} />
        <Route path="/registerhostel" element={<RegisterHostel name="Hostel" />} />
        <Route path="/registerhome" element={<RegisterHostel name="Home"/>} />
        <Route path="/registermess" element={<RegisterMess />} />
        <Route path="/allhostels" element={<AllHostels />} />
        <Route path="/allmess" element={<AllMess />} />
        <Route path="/hosteldetail/:id" element={<HostelDetail />} />
        <Route path="/feeds" element={<Feeds />} />
       
        <Route path="/updateprofile" element={<DashboardMain name="Update Profile" />} />
        <Route path="/managehostel" element={<DashboardMain name="Change Password"/>} />
        <Route path="/dashboard" element={<DashboardMain name="Update Profile"/>} />

        <Route path="*" element={<Home />} />


      </Routes>
    </>
  );
}

export default App;
