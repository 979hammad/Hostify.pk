import RegisterNavBar from "../../NavBar/RegisterNavBar/RegisterNavBar.jsx";
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import "./SelectBussiness.css";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import Login from "../../Auth/Login/Login.jsx";

const SelectBussiness = () => {
  const token = localStorage.getItem("token")
  const [openLogin, setOpen] = useState(false);

  const checkLogin = () => {
    if (!token) {
      setOpen(true)
    }
  }

  return (
    <>
    <RegisterNavBar />
    <div className='selectB'>

      <NavLink  to={token === null ? "" : '/registerhostel'} className='selectedB' onClick={checkLogin}>
       <BusinessIcon id="selectedBIcons"/>
       <p>Register Hostel</p>
      </NavLink>
      <NavLink to={token === null ? "" : '/registerhome'} className='selectedB' onClick={checkLogin}>
       <HomeIcon id="selectedBIcons"/>
       <p>Register Home</p>
      </NavLink>
      <NavLink to={token === null ? "" : '/registermess'} className='selectedB' onClick={checkLogin}>
       <LocalDiningIcon id="selectedBIcons"/>
       <p>Register Online Mess</p>
      </NavLink>
      
    </div>
    <Login openLogin={openLogin} setOpen={setOpen} />
    </>
  )
}

export default SelectBussiness