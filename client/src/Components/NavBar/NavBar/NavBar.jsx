import { useState, Menu, MenuItem, Box, Tooltip, IconButton, AccountCircleIcon, LogoutIcon } from "../../../assets/MaterialUiExports";
import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import Login from "../../Auth/Login/Login";
import EmailRegister from "../../Auth/SignUp/EmailRegister";
import Avatar from '@mui/material/Avatar';
import "./NavBar.css";
import {useDispatch, useSelector} from "react-redux";
import { user, logoutUser, myProfile } from '../../../features/auth/userAuthSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const user2 = useSelector((state)=> user(state.user))

  const [openLogin, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = localStorage.getItem("token");
  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  useEffect(()=>{ 
    if(token){
      dispatch(myProfile());
    }
  },[])

  return (
    <>
      <nav >
        <div className="nav">
          <div><span>Hostify.pk</span></div>

          {/* <img id="logo" src="/images/wafflaroLogo.png" /> */}
          <div className="middleNav">
            <NavLink to="/" className="middleNavItems">Home</NavLink>
            <NavLink to="/allhostels" className="middleNavItems">Hostels</NavLink>
            <NavLink to="/allmess" className="middleNavItems">Mess</NavLink>
            <NavLink to="/feeds" className="middleNavItems">Feeds</NavLink>
          </div>
          <div className="rightNav">
            <NavLink to="/selectbussiness" className="rightNavRegister">Register Bussiness</NavLink>
            <Box sx={{ flexGrow: 0 }} >
              <Tooltip>
                <IconButton id="navOptions"
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <MenuIcon id="navOptionsLines" />
                  {(token) ? <Avatar alt="E" id="navAvatar" src={user2.userPic?.userImage?.path} /> : <AccountCircleIcon id="accountIcon" /> }
                </IconButton>
              </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleMenuClose}
                  >
                   {(token) ?
                   <div>
                   <NavLink to="/updateprofile" className="textDecoration">
                     <MenuItem id="menuItem"
                       onClick={() => {
                         handleMenuClose();
                       }}
                     >
                       Update Profile
                     </MenuItem>
                   </NavLink>
                   <NavLink to="/managehostel" className="textDecoration">
                     <MenuItem id="menuItem"
                       onClick={() => {
                         handleMenuClose();
                       }}
                     >
                       Update Hostel
                     </MenuItem>
                   </NavLink>
                   <NavLink to="/dashboard" className="textDecoration">
                     <MenuItem id="menuItem"
                       onClick={() => {
                         handleMenuClose();
                       }}
                     >
                       Dashboard
                     </MenuItem>
                   </NavLink>
                   <hr id="menuItemHr" />
                   <MenuItem id="menuItem"
                     onClick={() => {
                       handleMenuClose(); dispatch(logoutUser());
                     }}
                   >
                     Logout
                     <LogoutIcon id="logoutIco" />
                   </MenuItem>
                 </div>:
                  <div>
                    <MenuItem id="menuItemLoggedOut"
                      onClick={() => {
                        handleMenuClose();
                        setOpen(true);
                      }}
                    >
                      LogIn
                    </MenuItem>
                    <MenuItem id="menuItemLoggedOut"
                      onClick={() => {
                        handleMenuClose();
                        setOpenSignUp(true)
                      }}
                    >
                      Sign Up
                    </MenuItem>
                  </div>
                }
                  </Menu>
              
             




            </Box>
          </div>
        </div>
        <Login openLogin={openLogin} setOpen={setOpen} />
        <EmailRegister openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
      </nav>

    </>
  );
};

export default NavBar;
