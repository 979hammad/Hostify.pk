import React, { useState } from "react";
import { Stepper, Step, StepButton, Button } from "@mui/material";
import "../RegisterHostel/RegisterHostel.css";
import RegisterNavBar from "../../NavBar/RegisterNavBar/RegisterNavBar";
import MessAddress from "./MessAddress/MessAddress";
import MessBasicInformation from "./MessBasicInformation/MessBasicInformation";
import MessFacilitiesAndRules from "./MessFacilitiesAndRules/MessFacilitiesAndRules";
import RegisterMessComp from "./RegisterMessComp/RegisterMessComp";
const steps = ["Basic Info & Contact", "Facilities & Rules", "Physical Address"];

const RegisterBussiness = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log(activeStep)

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
        //  <p>All steps completed</p>
        <RegisterMessComp/>
        ) : (
          <div>
            {steps[activeStep] === "Basic Info & Contact" ? <MessBasicInformation handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Facilities & Rules" ? <MessFacilitiesAndRules handleNext={handleNext}/> : ""}
            {steps[activeStep] === "Physical Address" ? <MessAddress handleNext={handleNext}/> : ""}
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
