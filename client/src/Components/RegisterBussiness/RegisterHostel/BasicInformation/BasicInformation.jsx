import {React, Button, Input, InputLabel, FormHelperText, useForm, InputAdornment, TextField} from "../../../../assets/MaterialUiExports.js";
import "./BasicInformation.css";
import InfoIcon from '@mui/icons-material/Info';

const BasicInformation = ({name, handleNext}) => {

  const {register, handleSubmit, formState : {errors}} = useForm();
  
  const submitForm = (data) => {
    // console.log(data)
    localStorage.setItem("hostelBasicInfo", JSON.stringify(data));
    handleNext()
  }

  return (
    <form className="basicInfoMain" onSubmit={handleSubmit(submitForm)}>
     <span className="basicInfoH">Enter Basic Information of {name}</span>
     <div>
     {/* <hr id="basicInfoHr"/> */}
     <InputLabel htmlFor="title"  id="title">Enter Your {name} Name</InputLabel>
     <h6 className="info"><InfoIcon id="infoIco"/> It will appear to all users. Remember you can change it later</h6>
      <TextField
        id="title"
        className="title"
        placeholder={`Enter your ${name} name here ...`}
        {...register("title", { required: "* Please Enter Hostel Name" })}
        error={errors?.title}
      />
      
      <FormHelperText id="hHelperText">{errors?.title?.message}</FormHelperText>
      
      <InputLabel htmlFor="description"  id="descriptionL">Describe Your {name}</InputLabel>
      <h6 className="info"><InfoIcon id="infoIco"/> Share the unique features, atmosphere, and experiences your {name} offers.</h6> 
      <TextField
        id="description"
        className="description"
        placeholder="What makes it a special place for Students?"
        type="text"
        multiline
        rows={4}
        {...register("description", { required: "* Please Enter Hostel Description"})}
        error={errors?.description}
      />
      <FormHelperText id="hHelperText">{errors?.description?.message}</FormHelperText>
      </div>
      <Button type="submit" id="stepperNextBtns" variant="contained" >
        Next
      </Button>    
    </form>
  );
};

export default BasicInformation;
