import { Button, IconButton, Input, InputAdornment, InputLabel, FormHelperText, useForm, CloseIcon} from "../../../assets/MaterialUiExports.js";
import { DisplaySignUpNo } from "../../../assets/DialogueAssets.js";
// import EmailRegister from "./EmailRegister.jsx";
import "./EmailRegister.css";
import "../Login/Login.css";

const NumberRegister = ({openSignUpNo, setOpenSignUpNo}) => {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const submitForm = (data) => {
    console.log(data)
  };
  
  return (
    <>
    {/* <EmailRegister /> */}
      <DisplaySignUpNo onClose={() => setOpenSignUpNo(false)} open={openSignUpNo}>
        <IconButton
          onClick={() => setOpenSignUpNo(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="signUpForm">
            <p className="signUpHeading">Register Using Mobile#</p>
            <InputLabel htmlFor="signUpemail" id="signUpemail">Phone No</InputLabel>
            <Input
              type="tel"
              id="signUpemail"
              autoComplete="off"
              maxLength={10}
              {...register("pNumber", {
                required: "Required field",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Only 10 digits : ----------",
                }
              })}
              startAdornment={<InputAdornment position="start">+92 </InputAdornment>}
              error={!!errors?.pNumber}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.pNumber?.message}
            </FormHelperText>
            {/* <p className="registerNo">Register Using <a className="signInClick" onClick={()=>{setOpenSignUpNo(false)}}>Email</a></p> */}
            <Button id="loginBtn" type="submit" variant="contained">
             Get OTP
           </Button>
        <div className="line">
          <hr className="hrLine"/>
          <span >Or</span>
          <hr className="hrLine"/>
        </div>
        <div className="googleLogin">
          <img className="googleLogo" src="images/google-logo.png" alt="" />
          <span className="googleLoginP">Sigup With Google</span>
        </div>
      <p className="signIn">
        Already have an Account ? <a className="signInClick">LogIn</a>
      </p>
      </div>
        </form>
      </DisplaySignUpNo>
      
    </>
  );
};

export default NumberRegister;
