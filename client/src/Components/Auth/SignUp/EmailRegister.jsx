import { React, useState, Button, IconButton, Input, InputLabel, FormHelperText, useForm, CloseIcon} from "../../../assets/MaterialUiExports.js";
import { useEffect } from "react";
import NumberRegister from "./NumberRegister.jsx";
import Login from "../Login/Login.jsx";
import Otp from "../Otp/Otp.jsx";
import { DisplaySignUp } from "../../../assets/DialogueAssets.js";
import { useDispatch, useSelector} from "react-redux";
import { signUpUser, otpSending, resendOTP } from "../../../features/auth/userAuthSlice.js";
import "./EmailRegister.css";
import "../Login/Login.css";

const EmailRegister = ({openSignUp, setOpenSignUp }) => {
  const dispatch = useDispatch();
  const otpSending2 = useSelector((state)=> otpSending(state.user));
 
  const {register, handleSubmit, formState: { errors }, reset} = useForm();
  const [openSignUpNo, setOpenSignUpNo] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [openLogin, setOpen] = useState(false);
  
  useEffect(() => {
    if (otpSending2 === "success") {
      setOpenOTP(true);
    }
  }, [otpSending2]);

  const submitForm = (data) => {
    dispatch(signUpUser(data));
  };

  return (
    <>
      <DisplaySignUp onClose={() => setOpenSignUp(false)} open={openSignUp}>
        <IconButton
          onClick={() => setOpenSignUp(false)}
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
            <p className="signUpHeading">Register Using Email</p>
            <InputLabel htmlFor="signUpemail" id="signUpemail">Email</InputLabel>
            <Input
              id="signUpemail"
              autoComplete="off"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9.%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.email?.message}
            </FormHelperText>

            <InputLabel htmlFor="password" >Password</InputLabel>
            <Input
              id="password"
              type="password"
              autoComplete="off"
              {...register("password", {
                required: "Required field",
              })}
              error={!!errors?.password}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.password?.message}
            </FormHelperText>

            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="off"
              {...register("cPassword", {
                required: "Required field",
              //   validate: (value) =>
              //     value === password || "The passwords do not match",
              // })}
              })}
              error={!!errors?.cPassword}
            />
            <FormHelperText id="signUpFormInputs">
              {errors?.cPassword?.message}
            </FormHelperText>

            <Button id="loginBtn" type="submit" variant="contained" >
            {otpSending2 === "idle" ? "Send OTP" : otpSending2 === "pending" ? "Sending ..." : "Resend OTP"}

            </Button>
            <div className="line">
              <hr className="hrLine"/>
              <span>Or</span>
              <hr className="hrLine"/>
            </div>
            <div className="googleLogin">
              <img className="googleLogo" src="images/google-logo.png" alt="" />
              <span className="googleLoginP" onClick={()=>window.open("http://localhost:8081/auth/google", "_self")}>Signup With Google</span>
            </div>
            <p className="signIn">
              Already have an Account ? 
              <a className="signInClick" onClick={()=>{setOpenSignUp(false); setOpen(true)}}>LogIn</a>
            </p>
          </div>
        </form>
      </DisplaySignUp>
      <NumberRegister openSignUpNo={openSignUpNo} setOpenSignUpNo={setOpenSignUpNo}/>
      <Login openLogin={openLogin} setOpen={setOpen}/>
      <Otp openOTP={openOTP} setOpenOTP={setOpenOTP} setOpenSignUp={setOpenSignUp} reset={reset}/>
    </>
  );
};

export default EmailRegister;
