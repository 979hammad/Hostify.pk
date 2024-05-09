import { Button, FormHelperText, InputLabel, MenuItem, TextField, useForm } from "../../../../assets/MaterialUiExports";
import "./ManualAddress.css";
import { useDispatch} from "react-redux";
import { updateMyHostels } from "../../../../features/hostel/registerHostelSlice";
import { useEffect } from "react";

const ManualAddress = ({name, data}) => {
  const dispatch = useDispatch();
  const {register, handleSubmit, formState : {errors}, setValue} = useForm();
  
  useEffect(()=>{
    setValue("streetNo", data.streetNo);
    setValue("cityName", data.city);
    setValue("province", data.province);
    setValue("completeAddress", data.completeAdress);
  },[])

  const submitForm = (address) => {
    localStorage.setItem("updatingHostelId", data._id); 
    dispatch(updateMyHostels(address));
  }

  return (
    <>
    <form className="manualAddressMainDiv" onSubmit={handleSubmit(submitForm)}>
    {/* <span className="AddressHeading">Enter your property Address</span> */}
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
          defaultValue={data.province}
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
    <div className='updateBtnDiv'><button className='updateBtn' type='submit'>Update</button></div>
    </form>
    </>
  )
}

export default ManualAddress