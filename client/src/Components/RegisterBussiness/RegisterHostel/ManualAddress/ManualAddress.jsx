import { Button, FormHelperText, InputLabel, MenuItem, TextField, useForm } from "../../../../assets/MaterialUiExports";
import "./ManualAddress.css";
import { useDispatch, useSelector } from "react-redux";
import { registerHostel, hDataLoading } from "../../../../features/hostel/registerHostelSlice";

const ManualAddress = ({name, handleNext}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, formState : {errors}} = useForm();
  const hDataLoading2 = useSelector((state)=> hDataLoading(state.hostel));

  const submitForm = (address) => {
    localStorage.setItem("manualAddress", JSON.stringify(address))
    dispatch(registerHostel())
  }
  return (
    <>
    <form className="manualAddressMainDiv" onSubmit={handleSubmit(submitForm)}>
    <span className="AddressHeading">Enter your property Address</span>
    <div>
      <InputLabel htmlFor="streetNo" id="streetNoL">Street No</InputLabel>
        <TextField 
          id='streetNo'
          placeholder='Enter Your Street no ...'
          autoComplete='off'
          {...register('streetNo', {required : "Please Enter Street No"})}
          error={!!errors?.streetNo}
        />
        <FormHelperText id="hHelperText">{errors?.streetNo?.message}</FormHelperText>
      <InputLabel htmlFor="cityName" id="cityNameL">City Name</InputLabel>
        <TextField 
          id='cityName'
          placeholder='Enter City Name ...'
          autoComplete='off'
          {...register('cityName', {required : "Please Enter City Name"})}
          error={!!errors?.cityName}
        />
        <FormHelperText id="hHelperText">{errors?.cityName?.message}</FormHelperText>
      <InputLabel htmlFor="selectProvince" id="selectProvinceL">Select Province</InputLabel>
        <TextField 
          select
          id='selectProvince'
          defaultValue="punjab"
          {...register('province', {required : "Kindly Select Image"})}
        >
          <MenuItem id="provinceVal" value="punjab">Punjab</MenuItem>
          <MenuItem id="provinceVal" value="sindh">Sindh</MenuItem>
          <MenuItem id="provinceVal" value="kpk">KPK</MenuItem>
          <MenuItem id="provinceVal" value="balochistan">Balochistan</MenuItem>
        </TextField>
        <FormHelperText id="hHelperText">{errors?.province?.message}</FormHelperText>
      <InputLabel htmlFor="completeAddress" id="completeAddressL">Complete Address</InputLabel>
        <TextField 
          id='completeAddress'
          placeholder='Enter Complete Address in Detail ...'
          multiline
          rows={2}
          {...register('completeAddress', {required : "Required Field"})}
          error={!!errors?.completeAddress}
        />
        <FormHelperText id="hHelperText">{errors?.completeAddress?.message}</FormHelperText>
    </div>
    {hDataLoading2 === "idle" && (
        <Button id="stepperNextBtns" variant="contained" type="submit">Save</Button>
      )}
      {hDataLoading2 === "pending" && (
        <Button id="stepperNextBtns" variant="contained" >saving...</Button>
      )}
      {hDataLoading2 === "success" && (
        <Button id="stepperNextBtns" variant="contained" onClick={()=>handleNext()}>Next</Button>
      )}
    </form>
    </>
  )
}

export default ManualAddress