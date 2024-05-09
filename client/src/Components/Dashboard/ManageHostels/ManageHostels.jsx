import { useEffect } from "react";
import "./ManageHostels.css";
import { useDispatch } from "react-redux";
import { allMyHostels } from "../../../features/hostel/registerHostelSlice";

const ManageHostels = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(allMyHostels());
  },[])
  
   return(
     <>
      <div className="ManageHostelsDiv">
     
      </div>
     </>
   )
}

export default ManageHostels ;