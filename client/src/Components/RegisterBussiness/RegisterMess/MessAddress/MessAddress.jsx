import React from 'react'
import { Button, FormHelperText, InputLabel, MenuItem, TextField, useForm } from "../../../../assets/MaterialUiExports";
import "./MessAddress.css";

const MessAddress = ({handleNext}) => {
  const {register, handleSubmit, formState : {errors}} = useForm();
  
  const submitForm = (address) => {
    handleNext()
    console.log(address)
  }
  return (
    <>
    <form onSubmit={handleSubmit(submitForm)}>
    <span className="AddressHeading">Enter your property Address</span>
    <div>
      <InputLabel htmlFor="streetNo" id="streetNoL">Street No</InputLabel>
        <TextField 
          id='streetNo'
          placeholder='Enter Your Street no ...'
          autoComplete='off'
          {...register('MstreetNo', {required : "Please Enter Street No"})}
          error={!!errors?.MstreetNo}
        />
        <FormHelperText id="AddressFormInputs">{errors?.MstreetNo?.message}</FormHelperText>
      <InputLabel htmlFor="cityName" id="cityNameL">City Name</InputLabel>
        <TextField 
          id='cityName'
          placeholder='Enter City Name ...'
          autoComplete='off'
          {...register('McityName', {required : "Please Enter City Name"})}
          error={!!errors?.McityName}
        />
        <FormHelperText id="AddressFormInputs">{errors?.McityName?.message}</FormHelperText>
      <InputLabel htmlFor="selectProvince" id="selectProvinceL">Select Province</InputLabel>
        <TextField 
          select
          id='selectProvince'
          defaultValue="punjab"
          {...register('Mprovince')}
        >
          <MenuItem id="provinceVal" value="punjab">Punjab</MenuItem>
          <MenuItem id="provinceVal" value="sindh">Sindh</MenuItem>
          <MenuItem id="provinceVal" value="kpk">KPK</MenuItem>
          <MenuItem id="provinceVal" value="balochistan">Balochistan</MenuItem>
        </TextField>
        <FormHelperText id="AddressFormInputs">{errors?.Mprovince?.message}</FormHelperText>
      <InputLabel htmlFor="completeAddress" id="completeAddressL">Complete Address</InputLabel>
        <TextField 
          id='completeAddress'
          placeholder='Enter Complete Address in Detail ...'
          multiline
          rows={2}
          {...register('McompleteAddress', {required : "Required Field"})}
          error={!!errors?.McompleteAddress}
        />
        <FormHelperText id="AddressFormInputs">{errors?.McompleteAddress?.message}</FormHelperText>
    </div>
    <Button type="submit" id="stepperNextBtns" variant="contained">Next</Button>      
    </form>
    </>
  )
}

export default MessAddress