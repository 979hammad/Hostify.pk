import React from 'react'
import { Button } from "../../../../assets/MaterialUiExports";
import { registerHostel } from "../../../../features/hostel/registerHostelSlice";

import "./RegistrationCompleted.css";

const RegistrationCompleted = ({name, handleNext}) => {

  return (
    <>
      <h1 >Congratulation your Hostel registration is complete</h1>
      <Button type="submit" id="stepperNextBtns" variant="contained" onClick={()=> window.location.reload()}>Finish</Button> 
    </>
  )
}

export default RegistrationCompleted;