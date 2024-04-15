import "./Type&Contact.css";
import BoyIcon from '@mui/icons-material/Boy';
import WomanIcon from '@mui/icons-material/Woman';
import InfoIcon from '@mui/icons-material/Info';
import {React,Button, FormHelperText, useForm, InputAdornment, TextField, useState} from "../../../../assets/MaterialUiExports.js";

const TypeAndContact = ({name, handleNext}) => { 
  const {register, handleSubmit, setValue, formState : {errors }, clearErrors} = useForm();
  const [catValue, setCatValue] = useState(null);
  
  const submitForm = (data) => {
    localStorage.setItem("TypeAndContact", JSON.stringify(data));
    handleNext();
  }

  const handleHostelTypeSelection = (value) => {
    setValue('category', {[value] : "true"});
    clearErrors('category')
    // setCatValue(value)
  };
  return (
    <>
      <form className="hostelTypeAndContact" onSubmit={handleSubmit(submitForm)}>
        <span className="Htype">Now Enter {name} Type & Contact Details</span>
        <div className="typeDiv">
        Select {name} Type
        <h6 className="info"><InfoIcon id="infoIco"/> select one option</h6> 
        <div className='typeMainDiv'>
            <button
              type="button"
              className={`hType ${catValue === "male" ? "isActive" : ""} ${errors?.category ? "TypeError" : ""}`}
              onClick={() => {handleHostelTypeSelection('male'); setCatValue("male")}}
            >
              Boys
              <BoyIcon id="typeIcoM"/>
            </button>
            <button
              type="button"
              className={`hType ${catValue === "female" ? "isActive" : ""} ${errors?.category ? "TypeError" : ""}`}
              onClick={() => {handleHostelTypeSelection('female'); setCatValue("female")}}
            >
              Girls
              <WomanIcon id="typeIcoW"/>
            </button>
            <button
              type="button"
              className={`hType ${catValue === "both" ? "isActive" : ""} ${errors?.category ? "TypeError" : ""}`}
              onClick={() => {handleHostelTypeSelection('both'); setCatValue("both")}}
            >
              Both
              <BoyIcon id="typeIcoM"/>
              <WomanIcon id="typeIcoW"/>
            </button>
            <input
              type="hidden"
              {...register('category', {
              required: 'Please select one option',
            })}
        />
        </div>
        <FormHelperText id="hostelFormInputs">{errors?.category?.message}</FormHelperText> 
        </div> 
     <div className='enterContact'>
        <hr />
        Enter Contact Numbers
        <h6 className="info"><InfoIcon id="infoIco"/> Enter mobile no and whatsapp no. Remember you can change them later </h6> 
        <div style={{display:"flex", alignItems: "top"}}>
         <label htmlFor="contactNo1" id="contactNoLP">Phone No : </label>
         <div>
          <TextField
              placeholder="Enter mobile no here ..."
              id="contactNo1"
              size="small"
              type="number"
              autoComplete="off"
              error={!!errors.HcontactNoP}
              {...register('HcontactNoP', {
               required: 'Phone number is required' ,
               pattern : { value : /^[0-9]{10}$/, message : "Without zero (Only 10 digits)"}
              })} 
              InputProps={{
                startAdornment: <InputAdornment position="start">+92</InputAdornment>,
                inputProps : {min : 0}
              }}
          />
          <FormHelperText id="hostelFormInputs">{errors?.HcontactNoP?.message}</FormHelperText> 
        </div>
      </div>
      <div style={{display:"flex", alignItems: "top"}}> 
      <label htmlFor="contactNo2" id="contactNoLW">Whatsapp No : </label> 
      <div>
      <TextField
          placeholder="Enter whatsapp no here ..."
          id="contactNo2"
          size="small"
          type="number"
          error={errors?.HcontactNoW}
          autoComplete="off"
          {...register('HcontactNoW', {
            pattern : {
              value : /^[0-9]{10}$/,
              message : "Without zero (Only 10 digits)"
          }
          })} 
          InputProps={{
            startAdornment: <InputAdornment position="start">+92</InputAdornment>,
            inputProps : {min : 0}
          }}
        />
          <FormHelperText id="hostelFormInputs">{errors?.HcontactNoW?.message}</FormHelperText> 
          </div>
      </div>
     </div>
      <Button type="submit" id="stepperNextBtns" variant="contained" >Next</Button>      
      </form>
    </>
  )
}

export default TypeAndContact