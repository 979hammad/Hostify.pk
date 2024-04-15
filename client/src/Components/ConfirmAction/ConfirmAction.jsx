import {
  React,
  Button,
} from "../../assets/MaterialUiExports";
import { DisplayConfirmAction } from "../../assets/DialogueAssets";
import "./ConfirmAction.css";
import {useSelector, useDispatch} from "react-redux";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { deleteAccount, deletingAccount } from "../../features/auth/userAuthSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const ConfirmAction = ({ action, openCD, setOpenCD }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deletingAccount2 = useSelector((state)=> deletingAccount(state.user)); 

  const ConfirmTask = (action) => {
    if(action === "Delete My Account"){
      dispatch(deleteAccount())
    }
  };

  useEffect(()=>{
    if(deletingAccount2 === "success"){
      navigate("/")
    }
  },[deletingAccount2])

  return (
    <>
      <DisplayConfirmAction open={openCD} onClose={() => setOpenCD(false)}>
        <div className="confirmAction">
          <PriorityHighIcon id="alertCD" />
          <Button
            id="btnCD"
            variant="contained"
            onClick={() => ConfirmTask(action)}
          >
            {deletingAccount2 === "pending" ? "Deleting Account ..." : action}
          </Button>
        </div>
      </DisplayConfirmAction>
    </>
  );
};

export default ConfirmAction;

