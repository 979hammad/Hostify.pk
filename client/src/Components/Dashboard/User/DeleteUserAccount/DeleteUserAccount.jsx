import { useState } from "react";
import "./DeleteUserAccount.css";
import ConfirmAction from "../../../ConfirmAction/ConfirmAction.jsx";
import { user } from "../../../../features/auth/userAuthSlice.js";
import { useSelector } from "react-redux";

const DeleteUserAccount = () => {
  const [openCD, setOpenCD] = useState(false);
  const gotUser = useSelector((state)=> user(state.user));
  
  return (
    <>
      <div className="deleteUserDiv">
        <p className="deleteP">
          If you delete this account, you will not be able to recover it again,
          and any associated property listings will also be deleted.
        </p>
        <p className="deleteP">
          We will also not provide any assistance for account recovery.
          Please proceed with caution.
        </p>
        <div className='deleteProfileBtnDiv'><button className='deleteProfileBtn' onClick={()=> setOpenCD(true)}>Delete Account Permanently</button></div>  
      </div>
      <ConfirmAction
        action="Delete My Account"
        openCD={openCD}
        setOpenCD={setOpenCD}
        // id={gotUser?._id}
    />
    </>
  )
}

export default DeleteUserAccount;