import React, { useState } from "react";
import { Stepper, Step, StepButton, Button, Typography } from "@mui/material";
import "./RegisterHostel.css";
import RegisterNavBar from "../../NavBar/RegisterNavBar/RegisterNavBar";
import TypeAndContact from "./Type&Contact/Type&Contact";
import Hfacilities from "./Facilities/Hfacilities";
import BasicInformation from "./BasicInformation/BasicInformation";
import HImages from "./HImages/HImages";
import RoomCharges from "./RoomCharges/RoomCharges";
import ManualAddress from "./ManualAddress/ManualAddress";
import RegistrationCompleted from "./RegistrationCompleted/RegistrationCompleted";
const steps = ["Basic Information", "Type & Contact", "Facilities & Rules", "Charges", "Images", "Address"];

const RegisterBussiness = ({name}) => {
  const [activeStep, setActiveStep] = useState(0);
 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
    <RegisterNavBar/>
    <div id="registerStepper">
      <Stepper id="stepperSteps" activeStep={activeStep} nonLinear>
        {steps.map((label, index) => (
          <Step  key={index}>
            <StepButton ><span id="stepperLabel">{label}</span></StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <RegistrationCompleted name = {name} handleNext={handleNext}/>
        ) : (
          <div>
            {steps[activeStep] === "Basic Information" ? <BasicInformation name = {name} handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Type & Contact" ? <TypeAndContact name = {name} handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Facilities & Rules" ? <Hfacilities name = {name} handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Charges" ? <RoomCharges handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Images" ? <HImages name = {name} handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Address" ? <ManualAddress name = {name} handleNext={handleNext}/> : ""}
            
            <div id="stepperBottom">
              <Button id="stepperPrevBtns" disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>  
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default RegisterBussiness;
