import React from 'react'
import { Button } from "../../../../assets/MaterialUiExports";
import {useDispatch, useSelector} from "react-redux";
import { registerHostel } from "../../../../features/hostel/registerHostelSlice";

import "./RegistrationCompleted.css";

const RegistrationCompleted = ({name, handleNext}) => {
  const dispatch = useDispatch();

  return (
    <>
      <h1 >Congratulation your Hostel registration is complete</h1>
      <Button onClick={()=> dispatch(registerHostel())} type="submit" id="stepperNextBtns" variant="contained" >Finish</Button> 
    </>
  )
}

export default RegistrationCompleted;