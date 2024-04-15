import React from "react";
import "./MessBasicInformation.css";
import InfoIcon from '@mui/icons-material/Info';
import { InputAdornment, InputLabel, TextField } from "@mui/material";
import {Button, useForm, FormHelperText } from "../../../../assets/MaterialUiExports";

const MessBasicInformation = ({handleNext}) => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  
  const getFormData = (data) => {
    console.log(data)
    handleNext()
  }

  return (
    <>
    <form id="MessBasicInfoMianDiv" onSubmit={handleSubmit(getFormData)}>
      <p className="MessBasicInfoH">Enter Basic Information & Contact Details</p>
      <InputLabel id="messTitleL">Enter Your Bussiness Name</InputLabel>
      <h6 className="info"><InfoIcon id="infoIco"/>This will help students to find you. Keep it short and attractive</h6> 
      <TextField 
        id="messTitle"
        autoComplete="off"
        placeholder="Enter you bussiness name here ..."
        {...register("messTitle", {required : "Kindly enter your bussiness name"})}
        error={!!errors?.messTitle}
      />
      <FormHelperText id="mHelperText">{errors?.messTitle?.message}</FormHelperText>
      <InputLabel id="messPhoneNoL">Phone No:</InputLabel>
      <h6 className="info"><InfoIcon id="infoIco"/>Please enter your daily use base phone no - You can also change it later</h6> 
      <TextField 
        id="messPhoneNo"
        type="number"
        autoComplete="off"
        placeholder="Enter mobile no here ..."
        {...register("messPhoneNo", {
          required : "Required Field",
          pattern : { value : /^[0-9]{10}$/, message : "Invalid - Without zero ( Only 10 digits )" }
        })}
        InputProps={{
            startAdornment : <InputAdornment position="start">+92</InputAdornment>,
            inputProps : { min : 0 }
        }}
        error={!!errors?.messPhoneNo}
      />
      <FormHelperText id="mHelperText">{errors?.messPhoneNo?.message}</FormHelperText>
      <InputLabel id="messWhatsappNoL">Whatsapp No:</InputLabel>
      <h6 className="info"><InfoIcon id="infoIco"/>Kindly enter your whatsapp no</h6> 
      <TextField 
        id="messWhatsappNo"
        placeholder="Enter Whatsapp no here ..."
        type="number"
        autoComplete="off"
        {...register("messWhatsappNo", 
        {
          pattern : { value : /^[0-9]{10}$/, message : "InValid - Without zero ( Only 10 digits )" }
        }
        )}
        InputProps={{
            startAdornment : <InputAdornment position="start">+92</InputAdornment>,
            inputProps : { min : 0 }
          }}
        error={!!errors?.messWhatsappNo}
      />
      <FormHelperText id="mHelperText">{errors?.messWhatsappNo?.message}</FormHelperText>
      <Button type="submit" id="stepperNextBtns" variant="contained">Next</Button>      
      </form>
    </>
  );
};

export default MessBasicInformation;
